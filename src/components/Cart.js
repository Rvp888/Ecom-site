
import React, { useContext, useEffect } from 'react'
import { cartContext } from './../global/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/Config';
import Navbar from './Navbar';
import Icon from 'react-icons-kit';
import { ic_add } from 'react-icons-kit/md/ic_add';
import { ic_remove } from 'react-icons-kit/md/ic_remove';
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline';



const Cart = () => {

    const navigate = useNavigate();
    const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(cartContext);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(!user){
                navigate('/login', {replace: true});
            }
        })
    })
    

    return (
        <>
            <Navbar />
            <>
                {shoppingCart.length !== 0 && <h1>Cart</h1>}
                <div className='cart-container'>
                    {
                        shoppingCart.length === 0 && 
                        <>
                            <div>no items in your cart or slow internet causing trouble (Refresh the page) or you are not logged in</div>
                            <div><Link to='/'>Return to Home Page</Link></div>
                        </>
                    }

                    {
                        shoppingCart && shoppingCart.map(cart => (
                            <div className='cart-card' key={cart.ProductID}>
                                <div className='cart-img'>
                                    <img src={cart.ProductImg} alt='Not Found'/>
                                </div>
                                <div className='cart-name'>{cart.ProductName}</div>
                                <div className='cart-price-original'>Rs. {cart.ProductPrice}.00</div>
                                <div className='inc' onClick={() => dispatch({type: 'INC', id: cart.ProductID, cart})}>
                                    <Icon icon={ic_add} size={24} />
                                </div>
                                <div className='quantity'>{cart.qty}</div>
                            </div>
                        ))
                    }
                </div>
            </>
        </>
    )
}

export default Cart
