
import React, { useState } from 'react';
import { db, storage } from '../config/Config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { collection } from 'firebase/firestore';


const AddProducts = () => {

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productImg, setProductImg] = useState(null);
    const [error, setError] = useState('');

    const types = ['image/png', 'image/jpeg']; // image types

    // product image handler
    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)){
            setProductImg(selectedFile);
            setError('');
        }
        else {
            setProductImg(null);
            setError('Please select a valid image type png or jpeg');
        }
    }

    // add product form submit event
    const addProduct = (e) => {
        e.preventDefault();
        // console.log(productName, productPrice, productImg);
        // storing the image in firebase
        const imgRef = ref(storage, `product-images/${productImg.name}`);
        const uploadTask = uploadBytesResumable(imgRef, productImg);
        uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
        }, (err) => {
            setError(err.message)
        }, 
        () => {
            // getting product url and if success then storing the product in db.
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                db.collection('Products').add({
                    ProductName: productName,
                    ProductPrice: Number(productPrice),
                    ProductImg: downloadURL
                }).then(() => {
                    setProductName('');
                    setProductPrice(0);
                    setProductImg('');
                    setError('');
                    document.getElementById('file').value = '';
                }).catch(err => setError(err.message));
            });
        })
    }


    return (
        <div className='container'>
            <br/>
            <h2>ADD PRODUCTS</h2>
            <hr/>
            <form autoComplete='off' className='form-group' onSubmit={addProduct} >
                <label htmlFor='product-name'>Product Name</label>
                <br/>
                <input type="text" className='form-control' required 
                onChange={(e) => setProductName(e.target.value)} value={productName} />
                <br/>
                <label htmlFor='product-price'>Product Price</label>
                <br/>
                <input type="number" className='form-control' required 
                onChange={(e) => setProductPrice(e.target.value)} value={productPrice} />
                <br/>
                <label htmlFor='product-img'>Product Image</label>
                <br/>
                <input type="file" className='form-control' id="file" onChange={productImgHandler} />
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
