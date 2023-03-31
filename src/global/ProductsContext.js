
import { getDocs } from 'firebase/firestore';
import React, { createContext } from 'react';
import { productCollection } from '../config/Config';

export const ProductsContext = createContext();

export class ProductsContextProvider extends React.Component {

    state = {
        products: []
    }

    componentDidMount() {
        // const prevProducts = this.state.products;
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
            <ProductsContext.Provider value={{ products: [...this.state.products] }}>
                {this.props.children}
            </ProductsContext.Provider>
        )
    }

}