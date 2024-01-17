import './style.css';
import {logout} from '../../Config/firebase';
import { useNavigate } from 'react-router-dom';
import { faL } from '@fortawesome/free-solid-svg-icons';

function UserInfoCart({userEmail}){
    const navigate = useNavigate();

    async function logoutFunc(){
        try{
            await logout();
        }catch(e){
            alert(e.message);
        }
    };

return(
    <div className='user-info-cart'>
        <span className='email-txt'>Email: {userEmail}</span>
        <br />
        <span className='logout-txt' onClick={logoutFunc}>Logout</span>
    </div>
)

}

export default UserInfoCart;