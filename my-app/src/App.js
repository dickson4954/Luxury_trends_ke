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
// In App.js, change this import:
import CartPage from './pages/CartPage'; // Change from './Components/CartPage'
import PaymentPage from './Components/PaymentPage';
import LoginPage from './Components/LoginPage';
import AdminDashboard from './Components/AdminDashboard';
import Footer from './Components/Footer';
import './App.css';

// Layout component for pages that need Navbar
const MainLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

// Layout for pages WITHOUT Navbar (for Cart page)
const NoNavbarLayout = ({ children }) => (
  <>
    {children}
    {/* Optionally add footer here if you want it */}
    {/* <Footer /> */}
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
        
        {/* Cart page WITHOUT Navbar - using CartPage component */}
        <Route path="/cart" element={
          <NoNavbarLayout>
            <CartPage />
          </NoNavbarLayout>
        } />
        
        {/* Admin dashboard WITHOUT Navbar & Footer */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
};

export default App;