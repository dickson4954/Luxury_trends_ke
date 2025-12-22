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
import LoginPage from './Components/LoginPage';
import AdminDashboard from './Components/AdminDashboard';
import Footer from './Components/Footer'; // Add Footer if you have one
import './App.css';

// Layout component for pages that need Navbar
const MainLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer /> {/* Add if you have footer */}
  </>
);

const App = () => {
  return (
    <div className="App">
      <Routes>
        {/* Pages WITH Navbar */}
        <Route path="/" element={
          <MainLayout>
            <LandingPage />
          </MainLayout>
        } />
        <Route path="/collections" element={
          <MainLayout>
            <AllCollections />
          </MainLayout>
        } />
        <Route path="/collections/:type" element={
          <MainLayout>
            <CollectionDetail />
          </MainLayout>
        } />
        <Route path="/contact" element={
          <MainLayout>
            <ContactPage />
          </MainLayout>
        } /> 
        <Route path="/trending-now" element={
          <MainLayout>
            <TrendingNow />
          </MainLayout>
        } /> 
        <Route path="/trending" element={
          <MainLayout>
            <TrendingAll />
          </MainLayout>
        } />
        <Route path="/products" element={
          <MainLayout>
            <AllProducts />
          </MainLayout>
        } />
        <Route path="/product/:slug" element={
          <MainLayout>
            <ProductDetails />
          </MainLayout>
        } />
        <Route path="/cart" element={
          <MainLayout>
            <Cart />
          </MainLayout>
        } />
        <Route path="/payment" element={
          <MainLayout>
            <PaymentPage />
          </MainLayout>
        } />
        <Route path="/login" element={
          <MainLayout>
            <LoginPage />
          </MainLayout>
        } />
        
        {/* Pages WITHOUT Navbar */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
};

export default App;