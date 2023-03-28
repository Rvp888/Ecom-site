
import React, { useContext, useEffect } from 'react'
import { cartContext } from './../global/CartContext';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/Config';

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
        <div>

        </div>
    )
}

export default Cart
