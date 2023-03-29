
import React, { useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { cartContext } from './../global/CartContext';
import { onAuthStateChanged } from 'firebase/auth';
import { query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { auth, db, usersCollection } from '../config/Config';


const Cashout = () => {

    const navigate = useNavigate();
    const { dispatch, totalPrice, totalQty } = useContext(cartContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cell, setCell] = useState('');
    const [address, setAddress] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        onAuthStateChanged(auth, async(user) => {
            if (user) {
                const q = query(usersCollection, where("userEmail", "==", user.email));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.id, " => ", doc.data().userName);
                    setName(doc.data().userName);
                    setEmail(doc.data().userEmail);
                });
            }
            else {
                navigate( '/login', { replace: true } );
            }
        })
    });

    const cashoutSubmit = (e) => {
        e.preventDefault();
        auth.onAuthStateChanged(user => {
            if (user) {
                const date = new Date();
                const time = date.getTime();
                const docRef = doc(db, ('Buyer-info ' + user.uid), ('_' + time));
                setDoc(docRef,{
                    BuyerName: name,
                    BuyerEmail: email,
                    BuyerCell: cell,
                    BuyerAddress: address,
                    BuyerPayment: totalPrice,
                    BuyerQuantity: totalQty
                }).then(() => {
                    setCell('');
                    setAddress('');
                    dispatch({ type: 'EMPTY' })
                    setSuccessMsg('Your order has been placed successfully. Thanks for visiting us. You will be redirected to home page after 5 seconds');
                    setTimeout(() => {
                        navigate( '/', { replace: true } );
                    }, 5000)
                }).catch(err => setError(err.message))
            }
        })
    }


    return (
        <>
            <Navbar />
            <div className='container'>
                <br/>
                <h2>Cashout Details</h2>
                <br/>
                { successMsg && <div className='success-msg'>{successMsg}</div> }
                <form autoComplete='off' className='form-group' onSubmit={cashoutSubmit}>
                    <label htmlFor='Name'>Name</label>
                    <input type='text' className='form-control' value={name} required disabled />
                    <br/>
                    <label htmlFor='Email'>Email</label>
                    <input type='email' className='form-control' value={email} required disabled />
                    <br/>
                    <label htmlFor='Cell No'>Cell No</label>
                    <input type='number' className='form-control' value={cell} onChange={(e) => setCell(e.target.value)} required placeholder='eg 09658741236' />
                    <br/>
                    <label htmlFor='Delivery Address'>Delivery Address</label>
                    <input type='text' className='form-control' value={address} onChange={(e) => setAddress(e.target.value)} required />
                    <br/>
                    <label htmlFor='Price To Pay'>Price To Pay</label>
                    <input type='number' className='form-control' value={totalPrice} required disabled />
                    <br/>
                    <label htmlFor='Total No of Products'>Total No of Products</label>
                    <input type='number' className='form-control' value={totalQty} required disabled />
                    <br/>
                    <button type='submit' className='btn btn-success btn-md mybtn' >SUBMIT</button>
                </form>
                {
                    error && <div className='error-msg'>{error}</div>
                }
            </div>
        </>
    )
}

export default Cashout
