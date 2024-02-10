import './style.css';
import { logout } from '../../Config/firebase';
import { removeUser } from '../../store/userInfoSlice';
import { useDispatch } from 'react-redux';

function UserInfoCart({ userEmail, setUserInfoCartView }) {

    const dispatch = useDispatch();

    async function logoutFunc() {
        try {
            await logout();
            dispatch(removeUser());
            setUserInfoCartView(false);
        } catch (e) {
            alert(e.message);
        }
    };

    return (
        <div className='user-info-cart'>
            <span className='email-txt'>Email: {userEmail}</span>
            <br />
            <a className='logout-anchor' onClick={logoutFunc}>Logout</a>
        </div>
    )

};

export default UserInfoCart;