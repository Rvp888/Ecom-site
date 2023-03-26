
import React from 'react';

const Signup = () => {


    const signup = () => {

    }


    return (
        <div className='container'>
            <br/>
            <h2>Sign Up</h2>
            <hr/>
            <form autoComplete='off' className='form-group' onSubmit={signup}>
                <label htmlFor='Name' >Name</label>
                <br/>
                <input type='text' className='form-control' required />
                <br/>
                <label htmlFor='Email' >Email</label>
                <br/>
                <input type='email' className='form-control' required />
                <br/>
                <label htmlFor='Password' >Password</label>
                <br/>
                <input type='password' className='form-control' required />
                <br/>
            </form>
        </div>
    )
}

export default Signup
