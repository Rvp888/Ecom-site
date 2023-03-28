import { createContext, useReducer } from "react";
import { CartReducer } from './CartReducer';


export const cartContext = createContext();

export const CartContextProvider = (props) => {

    const [cart, dispatch] = useReducer(CartReducer, { shoppingCart: [], totalPrice: 0, totalQty: 0 });

    return(
        <cartContext.Provider value={{ ...cart, dispatch }}>
            {props.children}
        </cartContext.Provider>
    )
}