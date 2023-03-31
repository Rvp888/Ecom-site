
import React, { useContext, useEffect, useState } from 'react';
import { cartContext } from './../global/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../config/Config';
import Navbar from './Navbar';
import Icon from 'react-icons-kit';
import { ic_add } from 'react-icons-kit/md/ic_add';
import { ic_remove } from 'react-icons-kit/md/ic_remove';
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline';
import '../css/Cart.css';
import { doc, setDoc, getDoc } from 'firebase/firestore';



const Cart = () => {

    const navigate = useNavigate();
    const {dispatch, shoppingCart, totalPrice, totalQty} = useContext(cartContext);
    // const [cartDetails, setCartDetails] = useState({});

    // useEffect(() => {
    //     onAuthStateChanged(auth, async(user) => {
    //         if (user) {
    //             const cartRef = doc(db, 'Carts', user.email);
    //             const docSnap = await getDoc(cartRef);
    //             if (docSnap.exists()) {
    //                 // console.log("Document data:", docSnap.data());
    //                 setCartDetails(docSnap.data())
    //                 // console.log('cartDetails',cartDetails);
    //                 // shoppingCart = docSnap.data().shoppingCart;
    //                 // totalPrice = docSnap.data().totalPrice;
    //                 // totalQty = docSnap.data().totalQty;
    //               } else {
    //                 // doc.data() will be undefined in this case
    //                 console.log("No such document!");
    //               }
    //         }
    //     })
    // })
    

    return (
        <>
            <Navbar />
            <>
                {shoppingCart?.length !== 0 && <h1>Cart</h1>}
                <div className='cart-container'>
                    {
                        shoppingCart?.length === 0 && 
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
                                <div className='inc' onClick={() => dispatch({ type: 'INC', id: cart.ProductID, cart })}>
                                    <Icon icon={ic_add} size={24} />
                                </div>
                                <div className='quantity'>{cart.qty}</div>
                                <div className='dec' onClick={() => dispatch({ type: 'DEC', id: cart.ProductID, cart })}> 
                                    <Icon icon={ic_remove} size={24} />
                                </div>
                                <div className='cart-price'>
                                    Rs. {cart.TotalProductPrice}.00
                                </div>
                                <button className='delete-btn' onClick={() => dispatch({ type: 'DELETE', id: cart.ProductID, cart })} >
                                    <Icon icon={iosTrashOutline} size={24} />
                                </button>
                            </div>
                        ))
                    }

                    { 
                        shoppingCart?.length > 0 && 
                        <div className='cart-summary'>
                            <div className='cart-summary-heading'>
                                Cart-Summary
                            </div>
                            <div className='cart-summary-price'>
                                <span>Total Price</span>
                                <span>{totalPrice}</span>
                            </div>
                            <div className='cart-summary-price'>
                                <span>Total Qty</span>
                                <span>{totalQty}</span>
                            </div>
                            <Link to='/cashout' className='cashout-link'>
                                <button className='btn btn-success btn-md' style={{ marginTop: 5 + 'px' }}>
                                    Cash on delivery
                                </button>
                            </Link>
                        </div> 
                    }
                </div>
            </>
        </>
    )
}

export default Cart
