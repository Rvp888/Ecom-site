
import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Products from './Products';
import '../css/Home.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/Config';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const Home = () => {

    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(!user) {
                navigate('/login', {replace: true});
            }
        })
    },[])

    return (
        <div className='wrapper'>
            <Navbar/>
            <Products/>
            <Footer/>
        </div>
    )
}

export default Home;
