
import React, { useContext } from 'react';
import Icon from 'react-icons-kit';
import { cart } from 'react-icons-kit/entypo/cart';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/Config';
import { cartContext } from '../global/CartContext';
import logo from '../images/logo.svg';
import { appContext } from './../App';

const Navbar = () => {

    const { totalQty } = useContext(cartContext);

    const navigate = useNavigate();

    const username = useContext(appContext);

    const logout = () => {
        auth.signOut().then(() => {
            navigate('/login', {replace: true});
        })
    }

    return (
        <div className='navbox'>
            <div className='leftside'>
                <img src={logo} />
            </div>
            {
                !username && 
                <div className='rightside'>
                    <Link to="signup" className='navlinks'>SIGN UP</Link>
                    <Link to="login" className='navlinks'>LOGIN</Link>
                </div>
            }
            
            {
                username && 
                <div className='rightside'>
                    <span><Link to='/' className='navlinks'>{username}</Link></span>
                    <span><Link to='/cartproducts' className='navlinks'><Icon icon={cart} /></Link></span>
                    <span><button className='logout-btn' onClick={logout}>LOGOUT</button></span>
                </div>
            }
        </div>
    )
}

export default Navbar
