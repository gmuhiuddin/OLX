import './style.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { signUp } from '../../Config/firebase'

function SignUp() {
    const navigate = useNavigate();

    async function signUporm(e) {
        e.preventDefault();
        if (e.target[3].value == e.target[4].value) {
            const result = await signUp(e.target[0].value, e.target[1].value, e.target[2].value, e.target[3].value);
            result == 'user is succesfully added' ? navigate('/') : alert(result);
        } else {
            e.target[4].style.boxShadow = '0px 0px 7px rgb(255, 0, 0)';
            e.target[4].value = '';
        }
    }

    return (
        <div>
            <div className='container'>
                <div className="sign-up-container">
                    <span>Sign Up</span>
                    <form onSubmit={signUporm}>
                        <br />
                        <input minlength="3" class="input" type="text" placeholder="First Name" required />
                        <br />
                        <input minlength="3" class="input" type="text" placeholder="Last Name" required />
                        <br />
                        <input class="input" type="email" placeholder="Email" required />
                        <br />
                        <input class="input" minlength="8" placeholder="Password" type="password" required />
                        <br />
                        <input class="input" onChange={(e) => e.target.style.boxShadow  = '0px 0px 7px rgb(0, 0, 0)'} minlength="8" placeholder="Repeat Password" type="password" required />
                        <br />
                        <button type="submit" >Sign up</button>
                    </form>
                    <p style={{ fontSize: 21 }}>You have an account <a style={{ color: 'rgb(128, 25, 207)', textDecoration:'underline', cursor:'pointer' }} onClick={() => navigate('/login')} >Login</a></p>
                </div>
            </div>
        </div>
    )
}

export default SignUp;