import { createContext } from "react";



export const cartContext = createContext();

const CartContextProvider = (props) => {

    return(
        <cartContext.Provider>
            {props.children}
        </cartContext.Provider>
    )
}