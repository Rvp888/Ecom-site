
import React, { useContext } from 'react';
import { ProductsContext } from '../global/ProductsContext';


const Products = () => {

    const { products } = useContext(ProductsContext);

    return (
        <div>
            Products
        </div>
    )
}

export default Products
