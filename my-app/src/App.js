import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import LandingPage from './Components/LandingPage';
import AllCollections from './Components/AllCollections';
import CollectionDetail from './Components/CollectionDetail';
import ContactPage from './Components/ContactPage';  
import Navbar from './Components/Navbar'; 
import TrendingAll from './Components/TrendingAll';
import TrendingNow from './Components/TrendingNow';
import AllProducts from './Components/AllProducts';
import ProductDetails from './Components/ProductDetails';
import Cart from './Components/Cart';
import PaymentPage from './Components/PaymentPage';
import './App.css';

const App = () => {
  return (
    <div>
      <Navbar /> 
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/collections" element={<AllCollections />} />
        <Route path="/collections/:type" element={<CollectionDetail />} />
        <Route path="/contact" element={<ContactPage />} /> 
        <Route path="/trending-now" element={<TrendingNow />} /> {/* Changed path */}
        <Route path="/trending" element={<TrendingAll />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </div>
  );
};

export default App;
