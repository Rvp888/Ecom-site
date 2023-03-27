
import React from 'react';

const Login = () => {




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
        <button type='submit' className='btn btn-success btn-md mybtn' >REGISTER</button>
      </form>
      {
        error && <div className='error-msg'>{error}</div>
      }
      <br />
      <span>Don't have an account? Register
        <Link to='signup'> Here</Link>
      </span>
    </div>
  )
}

export default Login
