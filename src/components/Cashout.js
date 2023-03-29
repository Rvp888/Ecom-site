
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
                </form>
            </div>
        </>
    )
}

export default Cashout
