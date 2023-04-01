
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db, usersCollection } from '../config/Config';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

const Signup = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImg, setProfileImg] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const signup = (e) => {
        e.preventDefault(); 
        createUserWithEmailAndPassword(auth, email, password)
        .then(async(res) => {
            console.log(res.user);
            const q = query(usersCollection, where("userEmail", "==", res.user.email));
            const snapshot = await getDocs(q);
            if(snapshot.docs.length === 0){
                const payload = {
                    userName: name,
                    userEmail: email,
                    userPassword: password,
                }
                const res1 = await addDoc(usersCollection, payload);
            }
            navigate('/login', {replace: true});
        }).catch((err) => {
            setError(err.message);
        })
    }


    return (
        <div className='container'>
            <br/>
            <h2>Sign Up</h2>
            <hr/>
            <form autoComplete='off' className='form-group' onSubmit={signup}>
                <label htmlFor='Name' >Name</label>
                <br/>
                <input type='text' className='form-control' required 
                onChange={(e) => setName(e.target.value)} value={name} />
                <br/>
                <label htmlFor='Email' >Email</label>
                <br/>
                <input type='email' className='form-control' required 
                onChange={(e) => setEmail(e.target.value)} value={email} />
                <br/>
                <label htmlFor='Password' >Password</label>
                <br/>
                <input type='password' className='form-control' required 
                onChange={(e) => setPassword(e.target.value)} value={password} />
                <br/>
                <label htmlFor='Profile picture' >Profile picture</label>
                <br/>
                <input type="file" className='form-control' id="file"
                onChange={(e) => setProfileImg(e.target.files[0])} />
                <br/>
                <button type='submit' className='btn btn-success btn-md mybtn' >REGISTER</button>
            </form>
            {
                error && <div className='error-msg'>{error}</div>
            }
            <br/>
            <span>Already have an account? Login
                <Link to='/login'> Here</Link>
            </span>
        </div>
    )
}

export default Signup
