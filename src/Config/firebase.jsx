import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

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
let userId;
let userData;

const getDateFromDb = async (id) => {
  if (id) {
    const result = await getDoc(doc(db, 'products', id))
    return result.data();
  }
  else {
    const result = await getDocs(collection(db, 'products'))
    return result;
  }
}

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    userId = uid;
    userData = await getDoc(doc(db, 'userInfo', userId));
    // ...
  } else {
    // User is signed out
    // ...
    userId = null;
    userData = null;
  }
});

export const getUserData = () => {
  return userData.data()?userData.data():null;
}

const login = async (email, password) => {
  var result;

  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      userId = user.id

      result = 'user is succesfully login';
      // ...
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
      // Signed in 
      const user = userCredential.user;
      userId = user.uid;

      await setDoc(doc(db, 'userInfo', user.uid), {
        firstname: name,
        lastname: fatherName,
        userImg: '',
        userEmail: user.email
      })

      result = 'user is succesfully added';
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
}

const addImageInDatabase = async (image) => {
  let storageRef = ref(storage, `usersImages/${userId}`);

  await uploadBytes(storageRef, image);
  const url = await getDownloadURL(storageRef);
  return url;
}

const addDateForAdds = async (addInfo) => {

  const discountPercentage = Math.round(Math.random() * 35);
  const rating = Math.floor(Math.random() * 5);
  const images = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3p3U7z5Gamd4oORfcHkwgLvpE-vCFM6pxpQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRUywYA3hf5Jaz8hzHeCzUWAAdPQ3W63dAzw&usqp=CAU']

  const obj = {
    ...addInfo,
    discountPercentage: discountPercentage,
    rating: rating,
    images: images
  }

  await addDoc(collection(db, 'products'), obj);
};

export { getDateFromDb, login, signUp, addDateForAdds, addImageInDatabase, logout };