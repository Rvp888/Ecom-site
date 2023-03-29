
import React, { useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { cartContext } from './../global/CartContext';
import { onAuthStateChanged } from 'firebase/auth';
import { query, where, getDocs } from 'firebase/firestore';
import { usersCollection } from '../config/Config';


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
        onAuthStateChanged(async (user) => {
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

    const cashoutSubmit = () => {

    }


    return (
        <>
            <Navbar />
            <div className='container'>
                <br/>
                <h2>Cashout Details</h2>
                <br/>
                <form autoComplete='off' className='form-group' onSubmit={cashoutSubmit}>
                    <label htmlFor='Name'>Name</label>
                    <input type='text' className='form-control' required disabled />
                    <br/>
                    <label htmlFor='Email'>Email</label>
                    <input type='email' className='form-control' required disabled />
                    <br/>
                    <label htmlFor='Cell No'>Cell No</label>
                    <input type='number' className='form-control' required placeholder='eg 09658741236' />
                    <br/>
                    <label htmlFor='Delivery Address'>Delivery Address</label>
                    <input type='text' className='form-control' required />
                    <br/>
                    <label htmlFor='Price To Pay'>Price To Pay</label>
                    <input type='number' className='form-control' required disabled />
                    <br/>
                    <label htmlFor='Total No of Products'>Total No of Products</label>
                    <input type='number' className='form-control' required disabled />
                    <br/>
                    <button type='submit' className='btn btn-success btn-md mybtn' >SUBMIT</button>
                </form>
            </div>
        </>
    )
}

export default Cashout
