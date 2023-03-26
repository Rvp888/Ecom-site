
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddProducts from './components/AddProducts';
import Home from './components/Home';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>} ></Route>
          <Route path="addproducts" element={<AddProducts/>} ></Route>
        </Routes>
      </BrowserRouter>
    )
  }
}

