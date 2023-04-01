import { createContext, useEffect, useReducer, useState } from "react";
import { CartReducer } from './CartReducer';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from "../config/Config";
import { doc, getDoc } from 'firebase/firestore';


export const cartContext = createContext();

export const CartContextProvider = (props) => {

    const [cartDetails, setCartDetails] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, async(user) => {
            if (user) {
                const cartRef = doc(db, 'Carts', user.email);
                const docSnap = await getDoc(cartRef);
                if (docSnap.exists()) {
                    // console.log("Document data:", docSnap.data());
                    setCartDetails(docSnap.data())
                    // console.log('cartDetails',cartDetails);
                  } else {
                    console.log("No such document!");
                  }
            }
        })
    },[]);

    const [cart, dispatch] = useReducer(CartReducer, cartDetails?.shoppingCart?.length ? cartDetails : { shoppingCart: [], totalPrice: 0, totalQty: 0 });

    return(
        <cartContext.Provider value={{ ...cart, dispatch }}>
            {props.children}
        </cartContext.Provider>
    )
}