import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'
import Register from './components/Register';
import ProductList from './components/ProductLists';
import ProductDetails from './components/ProductDetails';
import ProductCreation from './components/CreateProduct';
import HomePage from './components/HomePage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/productList" element={<ProductList/>} />
        <Route path="/productDetails" element={<ProductDetails/>} />
        <Route path="/productCreation" element={<ProductCreation/>} />
        <Route path='/home' element={<HomePage/>} />
        <Route path='/' element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
