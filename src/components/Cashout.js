
import React from 'react';

const Cashout = () => {



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
                </form>
            </div>
        </>
    )
}

export default Cashout
