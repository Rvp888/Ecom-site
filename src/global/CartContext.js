import { createContext, useEffect, useReducer } from "react";
import { CartReducer } from './CartReducer';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from "../config/Config";
import { doc, getDoc } from 'firebase/firestore';


export const cartContext = createContext();

export const CartContextProvider = (props) => {

    const [cart, dispatch] = useReducer(CartReducer, { shoppingCart: [], totalPrice: 0, totalQty: 0 });

    return(
        <cartContext.Provider value={{ ...cart, dispatch }}>
            {props.children}
        </cartContext.Provider>
    )
}