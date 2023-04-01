
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db, storage, usersCollection } from '../config/Config';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

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
            .then(async (res) => {
                const q = query(usersCollection, where("userEmail", "==", res.user.email));
                const snapshot = await getDocs(q);
                if (snapshot.docs.length === 0) {
                    console.log('inside if-condition')
                    const imgRef = ref(storage, `user-images/${profileImg.name}`);
                    const uploadTask = uploadBytesResumable(imgRef, profileImg);
                    uploadTask.on('state_changed',
                        (snapshot) => {
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log(progress);
                        }, (err) => {
                            setError(err.message)
                        },
                        () => {
                            // getting product url and if success then storing the product in db.
                            getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                                console.log('File available at', downloadURL);
                                const payload = {
                                    userName: name,
                                    userEmail: email,
                                    userPassword: password,
                                    userImg: downloadURL,
                                };
                                const res1 = await addDoc(usersCollection, payload);
                            })
                        })
                }
                navigate('/login', { replace: true });
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
