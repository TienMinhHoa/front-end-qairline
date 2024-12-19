import './styles/NewLogin.css'
import {useState} from "react";
import {getCurrentUserAction, loginAction} from "@/stores/authAction.js";
import {PATHS} from "@/routers/path.js";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {register} from "@/services/auth.js";

function NewLogin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSignedIn, setIsSignedIn] = useState(true);
    const [loading, setLoading] = useState(false);
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    })
    const [registerForm, setRegisterForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const handleChangeLoginForm = (prop) => (event) => {
        setLoginForm({...loginForm, [prop]: event.target.value});
    };

    const handleChangeRegisterForm = (prop) => (event) => {
        setRegisterForm({...registerForm, [prop]: event.target.value});
    };

    const handleLogin = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            await dispatch(loginAction(loginForm))
            await dispatch(getCurrentUserAction())
            navigate(PATHS.home)
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async (event) => {
        event.preventDefault()
        setLoading(true);
        try {
            await register(registerForm);
            setIsSignedIn(true)
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div className={`container ${isSignedIn ? 'active' : ''}`} id="container">
                {isSignedIn ? (
                    <div className="form-container sign-in">
                        <form onSubmit={handleLogin}>
                            <h1>Sign In</h1>
                            {/*<div className="social-icons">*/}
                            {/*    <a href="#" className="icon">*/}
                            {/*        <i className="fa-brands fa-google-plus-g"></i>*/}
                            {/*    </a>*/}
                            {/*    <a href="#" className="icon">*/}
                            {/*        <i className="fa-brands fa-facebook-f"></i>*/}
                            {/*    </a>*/}
                            {/*    <a href="#" className="icon">*/}
                            {/*        <i className="fa-brands fa-github"></i>*/}
                            {/*    </a>*/}
                            {/*    <a href="#" className="icon">*/}
                            {/*        <i className="fa-brands fa-linkedin-in"></i>*/}
                            {/*    </a>*/}
                            {/*</div>*/}
                            <span>Use your email password</span>
                            <input type="email" value={loginForm.email} onChange={handleChangeLoginForm('email')}
                                   placeholder="Email"/>
                            <input type="password" value={loginForm.password}
                                   onChange={handleChangeLoginForm('password')}
                                   placeholder="Password"/>
                            <a href="#">Forget Your Password?</a>
                            <button disabled={loading} type='submit'>{loading ? 'Loading...' : 'Sign In'}</button>
                        </form>
                    </div>
                ) : (
                    <div className="form-container sign-up">
                        <form onSubmit={handleRegister}>
                            <h1>Create Account</h1>
                            {/*<div className="social-icons">*/}
                            {/*    <a href="#" className="icon">*/}
                            {/*        <i className="fa-brands fa-google-plus-g"></i>*/}
                            {/*    </a>*/}
                            {/*    <a href="#" className="icon">*/}
                            {/*        <i className="fa-brands fa-facebook-f"></i>*/}
                            {/*    </a>*/}
                            {/*    <a href="#" className="icon">*/}
                            {/*        <i className="fa-brands fa-github"></i>*/}
                            {/*    </a>*/}
                            {/*    <a href="#" className="icon">*/}
                            {/*        <i className="fa-brands fa-linkedin-in"></i>*/}
                            {/*    </a>*/}
                            {/*</div>*/}
                            <span>Use your email for registeration</span>
                            <input type="text" value={registerForm.username}
                                   onChange={handleChangeRegisterForm('username')} placeholder="Username"/>
                            <input type="email" value={registerForm.email} onChange={handleChangeRegisterForm('email')}
                                   placeholder="Email"/>
                            <input type="password" value={registerForm.password}
                                   onChange={handleChangeRegisterForm('password')} placeholder="Password"/>
                            <input type="password" value={registerForm.confirmPassword}
                                   onChange={handleChangeRegisterForm('confirmPassword')}
                                   placeholder="Confirm Password"/>
                            <button disabled={loading} type='submit'>{loading ? 'Loading...' : 'Sign Up'}</button>
                        </form>
                    </div>
                )}


                <div className="toggle-container">
                    <div className="toggle">
                        {
                            isSignedIn ? (
                                <div className="toggle-panel toggle-left">
                                    <h1>Hello, Friend!</h1>
                                    <p>
                                        Register with your personal details to use all of
                                        site features
                                    </p>
                                    <button onClick={() => setIsSignedIn(false)} className="hidden" id="register">
                                        Sign Up
                                    </button>
                                </div>
                            ) : (
                                <div className="toggle-panel toggle-right">
                                    <h1>Welcome Back!</h1>
                                    <p>
                                        Enter your personal details to use all of site
                                        features
                                    </p>
                                    <button onClick={() => setIsSignedIn(true)} className="hidden" id="login">
                                        Sign In
                                    </button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewLogin
