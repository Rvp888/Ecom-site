
export const cartReducer = (state, action) => {
    const {shoppingCart, totalPrice, totalQty} = state;

    let product;
    let index;
    let updatedPrice;
    let updatedQty;

    switch(action.type){
        case 'ADD_TO_CART':
            const check = shoppingCart.find(product => product.ProductID === action.id);
            if(check){
                console.log('Product is already in your cart');
                return state;
            }
    }
}