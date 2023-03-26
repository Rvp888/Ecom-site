
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddProducts from './components/AddProducts';
import Home from './components/Home';
import { ProductsContextProvider } from './global/ProductsContext';
import Signup from './components/Signup';
import Login from './components/Login';

export default class App extends Component {
  render() {
    return (
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
    )
  }
}

