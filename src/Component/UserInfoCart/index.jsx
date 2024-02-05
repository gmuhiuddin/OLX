import './style.css';
import { logout } from '../../Config/firebase';

function UserInfoCart({ userEmail, setUserInfoCartView }) {

    async function logoutFunc() {
        try {
            await logout();
            setUserInfoCartView(false);
        } catch (e) {
            alert(e.message);
        }
    };

    return (
        <div className='user-info-cart'>
            <span className='email-txt'>Email: {userEmail}</span>
            <br />
            <a className='logout-anchor' href='/' onClick={logoutFunc}>Logout</a>
        </div>
    )

};

export default UserInfoCart;