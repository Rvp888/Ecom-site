
import React, { useContext, useState } from 'react';
import Icon from 'react-icons-kit';
import { cart } from 'react-icons-kit/entypo/cart';
import {search} from 'react-icons-kit/fa/search';
import { Link, useNavigate, } from 'react-router-dom';
import { auth } from '../config/Config';
import { cartContext } from '../global/CartContext';
import logo from '../images/logo.svg';
import { appContext } from './../App';
import { ProductsContext } from '../global/ProductsContext';

const Navbar = () => {

    const { totalQty } = useContext(cartContext);
    const userimg = useContext(appContext);
    const { filterSearchedProducts } = useContext(ProductsContext);
    const navigate = useNavigate();

    const [ searchedText, setSearchedText ] = useState('');

    const handleSearch = () => {
        filterSearchedProducts(searchedText);
    }

    const logout = () => {
        auth.signOut().then(() => {
            navigate('/login', {replace: true});
        })
    }

    return (
        <div className='navbox'>
            <div className='leftside'>
                <img src={logo} />
                <span>E-Cart</span>
            </div>

            <div className='mid-portion'>
                <input type='search' placeholder='Search' className='search-input' onChange={(e) => setSearchedText(e.target.value)} />
                <button className='search-button' onClick={handleSearch}><Icon className='search-icon' icon={search} /></button>
            </div>

            {
                !userimg && 
                <div className='rightside'>
                    <Link to="signup" className='navlinks'>SIGN UP</Link>
                    <Link to="login" className='navlinks'>LOGIN</Link>
                </div>
            }
            
            {
                userimg && 
                <div className='rightside'>
                    <span><Link to='/' className='navlinks'><img src={userimg} className='user-img' title='Home' /></Link></span>
                    <span><Link to='/cartproducts' className='navlinks'><Icon icon={cart} size={25} className='cart-icon' title='Go to cart' /></Link></span>
                    <div className='relative'>
                        <span className='no-of-products'>{totalQty}</span>
                    </div>
                    <span><button className='logout-btn' title='Logout' onClick={logout}>LOGOUT</button></span>
                </div>
            }
        </div>
    )
}

export default Navbar;
