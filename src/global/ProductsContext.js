
import { getDocs } from 'firebase/firestore';
import React, { createContext } from 'react';
import { productCollection } from '../config/Config';

export const ProductsContext = createContext();

export class ProductsContextProvider extends React.Component {

    state = {
        products: [],
        searchedProducts: [],
        searchedText: '',
    }

    filterSearchedProducts = (text) => {
       let filteredProducts = products.filter(product => product.ProductName.toLowerCase().includes(text.toLowerCase()));
       this.setState = {
            searchedProducts: filteredProducts,
            searchedText: text,
       }
    }

    componentDidMount() {
        getDocs(productCollection).then((res) => {
            let dataArr = [...res.docs];
            dataArr = dataArr.map((ele) => {
              return { ...ele.data(), ProductID: ele.id };
            });
            this.setState({
                products: dataArr
            })
        })
    }

    render(){
        return(
            <ProductsContext.Provider value={{ products: this.state.searchedText ? this.state.searchedProducts : this.state.products, filterSearchedProducts: this.filterSearchedProducts }}>
                {this.props.children}
            </ProductsContext.Provider>
        )
    }

}