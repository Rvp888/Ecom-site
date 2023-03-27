
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../config/Config';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then(() => {
      window.location.href = '/';
    }).catch((err) => {
      setError(err.message);
    })
  }


  return (
    <div className='container'>
      <br />
      <h2>Login</h2>
      <hr />
      <form autoComplete='off' className='form-group' onSubmit={login}>
        <label htmlFor='Email' >Email</label>
        <br />
        <input type='email' className='form-control' required
          onChange={(e) => setEmail(e.target.value)} value={email} />
        <br />
        <label htmlFor='Password' >Password</label>
        <br />
        <input type='password' className='form-control' required
          onChange={(e) => setPassword(e.target.value)} value={password} />
        <br />
        <button type='submit' className='btn btn-success btn-md mybtn' >LOGIN</button>
      </form>
      {
        error && <div className='error-msg'>{error}</div>
      }
      <br />
      <span>Don't have an account? Register
        <Link to='/signup'> Here</Link>
      </span>
    </div>
  )
}

export default Login
