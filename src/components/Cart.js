
import React, { useContext, useEffect } from 'react'
import { cartContext } from './../global/CartContext';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/Config';
import Navbar from './Navbar';

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

                </div>
            </>
        </>
    )
}

export default Cart
