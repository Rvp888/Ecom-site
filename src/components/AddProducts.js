
import React, { useState } from 'react';

const AddProducts = () => {

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productImg, setProductImg] = useState(null);
    const [error, setError] = useState('');

    const addProducts = () => {

    }

    const productImgHandler = () => {
        
    }

    return (
        <div className='container'>
            <br/>
            <h2>ADD PRODUCTS</h2>
            <hr/>
            <form autoComplete='off' className='form-group' onSubmit={addProducts} >
                <label htmlFor='product-name'>Product Name</label>
                <br/>
                <input type="text" className='form-control' required 
                />
                <br/>
                <label htmlFor='product-price'>Product Price</label>
                <br/>
                <input type="number" className='form-control' required 
                />
                <br/>
                <label htmlFor='product-img'>Product Image</label>
                <br/>
                <input type="file" className='form-control' onChange={productImgHandler} />
                <br/>
                <button className='btn btn-success btn-md mybtn' >ADD</button>
            </form>
            {
                error && <span>{error}</span>
            }
        </div>
    )
}

export default AddProducts
