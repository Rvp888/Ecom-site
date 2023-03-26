
import { collection, getDocs } from 'firebase/firestore';
import React, { createContext } from 'react';
import { db } from '../config/Config';

export const ProductsContext = createContext();

export class ProductsContextProvider extends React.Component {

    state = {
        products: []
    }

    componentDidMount() {
        // const prevProducts = this.state.products;
        getDocs(collection(db, "Products")).then((res) => {
            let dataArr = [...res.docs];
            dataArr = dataArr.map((ele) => {
              return { ...ele.data(), ProductId: ele.id };
            });
            this.setState({
                products: dataArr
            })
        })
        // db.collection('Products').onSnapshot(snapshot => {
        //     let changes = snapshot.docChanges();
        //     changes.forEach(change => {
        //         if(change.type === 'added'){
        //             prevProducts.push({
        //                 ProductId: change.doc.id,
        //                 ProductName: change.doc.data().ProductName,
        //                 ProductPrice: change.doc.data().ProductPrice,
        //                 ProductImg: change.doc.data().ProductImg
        //             })
        //         }
        //         this.setState({
        //             products: prevProducts
        //         })
        //     })
        // })
    }

    render(){
        return(
            <ProductsContext.Provider value={{ products: [...this.state.products] }}>
                {this.props.children}
            </ProductsContext.Provider>
        )
    }

}