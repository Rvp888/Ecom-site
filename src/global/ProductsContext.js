
import React, { createContext } from 'react';
import { db } from '../config/Config';

export const ProductsContext = createContext();

export class ProductsContextProvider extends React.Component {

    state = {
        products: []
    }

    componentDidMount() {
        const prevProducts = this.state.products;
        db.collections('Products').onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if(change.type === 'added'){
                    prevProducts.push({
                        ProductId: change.doc.id,
                        ProductName: change.doc.date().ProductName,
                    })
                }
            })
        })
    }

}