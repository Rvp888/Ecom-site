import { createContext, useEffect, useReducer, useState } from "react";
import { CartReducer } from './CartReducer';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from "../config/Config";
import { doc, getDoc } from 'firebase/firestore';


export const cartContext = createContext();

export const CartContextProvider = (props) => {

    const [cartDetails, setCartDetails] = useState({ shoppingCart: [], totalPrice: 0, totalQty: 0 });

    const [cart, dispatch] = useReducer(CartReducer, cartDetails);
    
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const cartRef = doc(db, 'Carts', user.email);
                const docSnap = await getDoc(cartRef);
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    let temp = { ...docSnap.data() };
                    dispatch({ type:'UPDATE_DATA', payload: {...temp}})
                } else {
                    console.log("No such document!");
                }
            }
        });
    }, []);


    return (
        <cartContext.Provider value={{ ...cart, dispatch }}>
            {props.children}
        </cartContext.Provider>
    )
}