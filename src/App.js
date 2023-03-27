
import React, { Component, createContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddProducts from './components/AddProducts';
import Home from './components/Home';
import { ProductsContextProvider } from './global/ProductsContext';
import Signup from './components/Signup';
import Login from './components/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './config/Config';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const appContext = createContext();

const App = () => {

  const [username, setUsername] = useState(null);

  useEffect(() => {

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const usersCollection = collection(db, "Users");
        const q = query(usersCollection, where("userEmail", "==", user.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data().userName);
          setUsername(doc.data().userName)
          console.log(username);
        });
      }
      else {
        setUsername(null)
      }
    })
  });
    

    return (
      <appContext.Provider value={username}>
        <ProductsContextProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} ></Route>
            <Route path="addproducts" element={<AddProducts />} ></Route>
            <Route path="signup" element={<Signup />} ></Route>
            <Route path="login" element={<Login />} ></Route>
          </Routes>
        </BrowserRouter>
        </ProductsContextProvider>
      </appContext.Provider> 
    )
  }


  export default App;