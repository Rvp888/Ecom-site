
import React, { useContext } from 'react'
import { cartContext } from './../global/CartContext';

const Cart = () => {

    const data = useContext(cartContext);
    console.log(data);

    return (
        <div>

        </div>
    )
}

export default Cart
