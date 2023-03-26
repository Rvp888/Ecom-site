
import React from 'react';

const AddProducts = () => {

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
                <label htmlFor='product-price'>Product Price</label>
                <br/>
                <input type="number" className='form-control' required 
                />
                <br/>
                <label htmlFor='product-img'>Product Image</label>
                <br/>
                <input type="file" className='form-control' onChange={productImgHandler} />
                <br/>
                <button className='btn btn-success btn-md' >ADD</button>
            </form>
        </div>
    )
}

export default AddProducts
