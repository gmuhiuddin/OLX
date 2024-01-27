import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../Config/firebase';
import SmallLoader from '../SmallLoader';
import { useState, useEffect, useContext } from 'react';
import {onAuthStateChanged} from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import nodeContext from '../../note/nodeContext'

function UserLoggedOrNo({setUserEmail, userInfoCartView, setUserInfoCartView}) {
  
    const [userData, setUserData] = useState();
    const [loader, setLoader] = useState(true);
    const useContextState = useContext(nodeContext);
    const navigate = useNavigate();

    console.log(useContextState);

        useEffect(() => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                  // User is signed in, see docs for a list of available properties
                  // https://firebase.google.com/docs/reference/js/auth.user
                  const uid = user.uid;
                  const userDateFromDb = await getDoc(doc(db, 'userInfo', uid));
                  setUserEmail(userDateFromDb.data().userEmail)
                  setUserData(userDateFromDb.data());
                  useContextState.updateUserData(userDateFromDb.data())
                  // ...
                } else {
                  // User is signed out
                  // ...
                  setUserData(null);
                }
                setLoader(false)
              });

        }, [])

    return (

       <div  style={{display:'flex', alignItems:'center'}}>
         {loader ?
            <SmallLoader /> :
            userData ?
            <div>
        <span onClick={() => setUserInfoCartView(!userInfoCartView)} style={{cursor:'pointer', fontSize: 25, marginLeft: 7, fontWeight: '500' }} >{userData.firstname + ' ' + userData.lastname}</span>
        </div>
            : 
        <div>
        <span className='login-txt' onClick={() => {
        navigate('/login')
    }}>Login</span>
    </div>
        }
        
    <div onClick={() => {
        userData?navigate('/addSellPost'):navigate('/login')
    }} className='btn-container'>
          <img src='https://www.olx.com.pk/assets/iconSellBorder_noinline.d9eebe038fbfae9f90fd61d971037e02.svg' />
          <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><span style={{ fontSize: 37, marginBottom: 7 }}>+</span> SELL</span>
        </div>
       </div>
    );
}

export default UserLoggedOrNo;