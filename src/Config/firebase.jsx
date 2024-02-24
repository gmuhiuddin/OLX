import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { getFirestore, getDocs, setDoc, getDoc, collection, addDoc, query, doc, where, onSnapshot, serverTimestamp, orderBy, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRoL0wtWFQpsLsOR51GvN3nCgoX8IEzgY",
  authDomain: "olx-clone-b4869.firebaseapp.com",
  projectId: "olx-clone-b4869",
  storageBucket: "olx-clone-b4869.appspot.com",
  messagingSenderId: "517440342860",
  appId: "1:517440342860:web:0db7f06a31809991b61de9",
  measurementId: "G-WNG1M7XXGW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

const getDateFromDb = async (id) => {
  if (id) {
    const result = await getDoc(doc(db, 'products', id))

    return {
      ...result.data(),
      id: result.id
    };
  }
  else {
    const result = await getDocs(collection(db, 'products'))
    return result;
  }
};

const login = async (email, password) => {
  var result;

  await signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;

      const userDataRef = doc(db, 'userInfo', user.uid);

      const userData = await getDoc(userDataRef);

      const obj = {
        user: true,
        userData: userData.data(),
        userId: user.uid
      };

      result = obj;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      result = errorMessage;
    });

  return result;
};

const signUp = async (name, fatherName, email, password) => {
  var result;

  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {

      const user = userCredential.user;

      await setDoc(doc(db, 'userInfo', user.uid), {
        firstname: name,
        lastname: fatherName,
        userImg: '',
        userEmail: user.email,
        cartsIdForBasket:[]
      });

      const userDataRef = doc(db, 'userInfo', user.uid);

      const userData = await getDoc(userDataRef);

      const obj = {
        user: true,
        userData: userData.data(),
        userId: user.uid
      };

      result = obj;

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      result = errorMessage;
    });

  return result;
};

const logout = async () => {
  await signOut(auth);
};

const getProductId = async () => {

  const res = await getDoc(doc(db, 'productId', 'XWoz6GX60rzwW6ZZSfOr'));
  const productId = res.data().productId;

  return productId;
};

const addMultiImagesInDatabase = async (image, imageNum) => {

  const productId = await getProductId();

  let storageRef = ref(storage, `productImages/${imageNum}/${productId}`);

  await uploadBytes(storageRef, image);
  const url = await getDownloadURL(storageRef);
  return url;
};

const addImageInDatabase = async (image) => {
  const productId = await getProductId();

  let storageRef = ref(storage, `productImage/${productId}`);

  await uploadBytes(storageRef, image);
  const url = await getDownloadURL(storageRef);
  return url;
}

const addDateForAdds = async (addInfo, userId) => {

  const productId = await getProductId();

  const discountPercentage = Math.round(Math.random() * 35);
  const rating = Math.floor(Math.random() * 5);

  const userData = await getDoc(doc(db, 'userInfo', userId));

  const obj = {
    ...addInfo,
    discountPercentage: discountPercentage,
    rating: rating,
    ...userData.data(),
    userId: userData.id,
    productId
  };

  await addDoc(collection(db, 'products'), obj);

  await updateDoc(doc(db, 'productId', 'XWoz6GX60rzwW6ZZSfOr'), {
    productId: productId + 1
  });
};

const addUserMsg = async (msgInfo) => {

  await addDoc(collection(db, 'usersChats'), {
    ...msgInfo,
    time: serverTimestamp()
  });

};

const getUsersMsg = async (chatId) => {

  const msgRef = query(collection(db, 'usersChats'), orderBy("time"), where("chatId", "==", chatId));

  const abc = new Promise((resolve, reject) => {
    onSnapshot(msgRef, (data) => {

      if (data.empty) {
        reject('on Chats')
      } else {
        resolve(data.docs)
      }
    })

  })

  return abc;
};

const resetPass = async (email) => {
  const res = sendPasswordResetEmail(auth, email);

  return res;
};

const addToCart = async (id, userId) => {
  const res = await getDoc(doc(db, 'userInfo', userId));

  let idIsAlreadyExist = false;

  const cartsIds = [...res.data().cartsIdForBasket];

  for (let i = 0; i < cartsIds.length; i++) {
    if (cartsIds[i] == id) {
      idIsAlreadyExist = true;
      break;
    };
  };

  if (!idIsAlreadyExist) {
    cartsIds.push(id);
  };

  await updateDoc(doc(db, 'userInfo', userId), {
    cartsIdForBasket: cartsIds
  });

};

const removeFromCart = async (id, userId) => {

  const res = await getDoc(doc(db, 'userInfo', userId));

  const cartIndex = res.data().cartsIdForBasket.indexOf(id);

  const cartsIds = [...res.data().cartsIdForBasket];

  cartsIds.splice(cartIndex, 1);

  await updateDoc(doc(db, 'userInfo', userId), {
    cartsIdForBasket: cartsIds
  });

};

const getDataOfAddToCart = async (userId) => {
  const res = await getDoc(doc(db, 'userInfo', userId));
  
  return res.data().cartsIdForBasket;
};

export { getDateFromDb, login, signUp, addDateForAdds, getUsersMsg, addImageInDatabase, logout, addUserMsg, resetPass, addMultiImagesInDatabase, addToCart, removeFromCart, getDataOfAddToCart };