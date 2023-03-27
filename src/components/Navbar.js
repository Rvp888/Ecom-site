
import React, { useContext } from 'react';
import Icon from 'react-icons-kit';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import { appContext } from './../App';

const Navbar = () => {

    const username = useContext(appContext);

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
                    <span><Link to='cartproducts'><Icon></Icon></Link></span>
                </div>
            }
        </div>
    )
}

export default Navbar
