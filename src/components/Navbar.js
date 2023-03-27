
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import { appContext } from './../App';

const Navbar = () => {

    const username = useContext(appContext);

    return (
        <div className='navbox'>
            <div className='leftside'>
                <img src={logo} />
            </div>
            
        </div>
    )
}

export default Navbar
