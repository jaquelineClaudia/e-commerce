import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cart from '../components/Cart';
import '../styles/Navbar.css';
import { getCartProductsThunk, loginThunk } from '../redux/actions';

const NavBar = () => {
    const [ isLoginOpen, setIsLoginOpen ] = useState(false);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loginError, setLoginError ] = useState("");
    const [ isCartOpen, setIsCartOpen ] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = e => {
        e.preventDefault();

        const credentials = {
              email,
              password
        };
        dispatch(loginThunk(credentials))
            .then(res => { localStorage.setItem("token", res.data.data.token)
                setIsLoginOpen(false)
                setLoginError("")})
            .catch(error => setLoginError(error.response.data.message));
    };

    const logOut = () => {
        localStorage.setItem("token", "")
        setIsLoginOpen(false);
    };

    const openCart = () => {
        setIsCartOpen(!isCartOpen)
        dispatch(getCartProductsThunk());
    };

    return (
        <div className='navbar-container'>
            <div className="navbar-position">
                <nav className='navbar'>
                    <h2 onClick={() => navigate('/')}>e-commerce Academlo</h2>
                    {
                        localStorage.getItem("token") ? (
                            <button onClick={() => setIsLoginOpen(!isLoginOpen)} style={{color:'#c51212'}}><i className="fa-solid fa-user-slash"></i></button>
                            ) : ( <button onClick={() => setIsLoginOpen(!isLoginOpen)}><i className="fa-solid fa-user"></i></button>
                    )}
                    <button onClick={openCart} style={isCartOpen ? {color:'#c51212'} : {color: '#340101'}}><i className="fa-solid fa-cart-shopping"></i></button>
                    <button onClick={() => navigate('/purchases/')}><i className="fa-solid fa-box-archive"></i></button>
                </nav>
            </div> 

            <form className={`login ${isLoginOpen ? 'open' : ''}` } onSubmit={login}>
                {
                    localStorage.getItem("token") ? (
                        <div className="log-out-container">
                            <i className="fa-solid fa-user user-icon"></i>
                            <p className='user-name'> John Smith</p>
                            <button onClick={logOut} type='button' className='log-out-button'>Log out</button>
                        </div>                 
                    ) : (
                        <div className='login-container'>
                            <i className="fa-solid fa-user user-icon"></i>
                            <div className="input-section">
                                <div className="input-container">
                                    <label htmlFor="email">Email</label>
                                        <input
                                            id='email' 
                                            type="email"  
                                            placeholder='example@example.com'
                                            onChange={e => setEmail(e.target.value)}
                                            value={email}    
                                        />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        id='password' 
                                        type="password" 
                                        placeholder='*******'
                                        onChange={e => setPassword(e.target.value)}
                                        value={password}
                                    />
                                </div>
                            
                                <p>{loginError}</p>
                                <button className='login-button'>Enter</button>
                            </div>                       
                        </div>                   
                    )
                }     
            </form>
            <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen}/>
        </div>
    );
};

export default NavBar;