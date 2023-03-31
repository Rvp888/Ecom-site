
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/Config';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';

toast.configure();


export const CartReducer = (state, action) => {
    
    const {shoppingCart, totalPrice, totalQty} = state;
    const [ cartRef, setCartRef ] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCartRef( doc(db, 'Carts', user.email) );
            }
        });
    },[]);


    let product;
    let index;
    let updatedPrice;
    let updatedQty;

    switch(action.type){
        case 'ADD_TO_CART':
            const check = shoppingCart.find(product => product.ProductID === action.id);
            if(check){                
                toast.info('this product is already in your cart', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
                return state;
            }
            else {
                product = action.product;
                product['qty'] = 1;
                product['TotalProductPrice'] = product.ProductPrice * product.qty;
                updatedQty = totalQty + 1;
                updatedPrice = totalPrice + product.ProductPrice;
                setDoc(cartRef, {
                    shoppingCart: [product, ...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
                });
                return {
                    shoppingCart: [product, ...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
                }
            }
            break;
        
        case 'INC':
            product = action.cart;
            product.qty = ++product.qty;
            product.TotalProductPrice = product.ProductPrice * product.qty;
            updatedQty = totalQty + 1;
            updatedPrice = totalPrice + product.ProductPrice;
            index = shoppingCart.findIndex(cart => cart.ProductID === action.id);
            shoppingCart[index] = product;
            console.log(shoppingCart);            
            setDoc(cartRef, {
                shoppingCart: [...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
            });
            return {
                shoppingCart: [...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
            }
            break;
        
        case 'DEC':
            product = action.cart;
            if (product.qty > 1) {
                product.qty = product.qty - 1;
                product.TotalProductPrice = product.ProductPrice * product.qty;
                updatedQty = totalQty - 1;
                updatedPrice = totalPrice - product.ProductPrice;
                index = shoppingCart.findIndex(cart => cart.ProductID === action.id);
                shoppingCart[index] = product;
                setDoc(cartRef, {
                    shoppingCart: [...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
                });
                return {
                    shoppingCart: [...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
                }
            }else {
                return state;
            }
            break;
        
        case 'DELETE':
            const filtered = shoppingCart.filter(product => product.ProductID !== action.id);
            product = action.cart;
            updatedQty = totalQty - product.qty;
            updatedPrice = totalPrice - product.TotalProductPrice;
            setDoc(cartRef, {
                shoppingCart: [...filtered], totalPrice: updatedPrice, totalQty: updatedQty
            });
            return {
                shoppingCart: [...filtered], totalPrice: updatedPrice, totalQty: updatedQty
            }
            break;

        case 'EMPTY':
            setDoc(cartRef, {
                shoppingCart: [], totalPrice: 0, totalQty: 0
            });
            return {
                shoppingCart: [], totalPrice: 0, totalQty: 0
            }

        default:
            return state;
    }
}