
import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddProducts from './components/AddProducts';
import Home from './components/Home';
import { ProductsContextProvider } from './global/ProductsContext';
import Signup from './components/Signup';
import Login from './components/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, usersCollection } from './config/Config';
import { query, where, getDocs } from 'firebase/firestore';
import { CartContextProvider } from './global/CartContext';
import Cart from './components/Cart';
import Cashout from './components/Cashout';
import { CartReducer } from './global/CartReducer';


export const appContext = createContext();

const App = () => {

  const [username, setUsername] = useState(null);
  const [useremail, setUseremail] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async(user) => {
      if (user) {
        const q = query(usersCollection, where("userEmail", "==", user.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data().userName);
          setUsername(doc.data().userName);
          setUseremail(doc.data().userEmail);
        });
      }
      else {
        setUsername(null)
      }
    })
  },[]);
    

    return (
      <BrowserRouter>
        <appContext.Provider value={username}>
          <ProductsContextProvider>
            <CartContextProvider>  
                <Routes>
                  <Route exact path="/" element={<Home />} ></Route>
                  <Route path="addproducts" element={<AddProducts />} ></Route>
                  <Route path="signup" element={<Signup />} ></Route>
                  <Route path="login" element={<Login />} ></Route>
                  <Route path="cartproducts" element={<Cart />} ></Route>
                  <Route path="/cashout" element={<Cashout/>}></Route>
                </Routes>  
            </CartContextProvider>
          </ProductsContextProvider>
        </appContext.Provider> 
      </BrowserRouter>
    )
  }


  export default App;