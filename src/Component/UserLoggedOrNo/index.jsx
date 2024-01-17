import { useNavigate } from 'react-router-dom';
import { getUserData } from '../../Config/firebase';
import SmallLoader from '../SmallLoader';
import { useState, useEffect } from 'react';

function UserLoggedOrNo({setUserEmail, userInfoCartView, setUserInfoCartView}) {
    const [userData, setUserData] = useState();
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();
    
        setTimeout(async () => {
            try {
                const res = await getUserData();
                setUserData(res);
                setUserEmail(res.userEmail)
            } catch (e) {
                console.log(e.message);
            } 
            setLoader(false);
        }, 899);

    if (loader) {
        return (
            <SmallLoader />  
        );
    };
    
    if (userData) {
        return (
            <div style={{display:'flex', alignItems:'center'}}>
                <span onClick={() => setUserInfoCartView(!userInfoCartView)} style={{cursor:'pointer', fontSize: 25, marginLeft: 7, fontWeight: '500' }} >{userData.firstname + ' ' + userData.lastname}</span>
            <div onClick={() => navigate('/addsellpost')} className='btn-container'>
              <img src='https://www.olx.com.pk/assets/iconSellBorder_noinline.d9eebe038fbfae9f90fd61d971037e02.svg' />
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><span style={{ fontSize: 37, marginBottom: 7 }}>+</span> SELL</span>
            </div>
            </div>
        );
    };

    return (
        <div style={{display:'flex',  alignItems:'center'}}>
            <span className='login-txt' onClick={() => {
            navigate('/login')
        }}>Login</span>
        <div onClick={() => navigate('/login')} className='btn-container'>
              <img src='https://www.olx.com.pk/assets/iconSellBorder_noinline.d9eebe038fbfae9f90fd61d971037e02.svg' />
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><span style={{ fontSize: 37, marginBottom: 7 }}>+</span> SELL</span>
            </div>
        </div>
    );
}

export default UserLoggedOrNo;