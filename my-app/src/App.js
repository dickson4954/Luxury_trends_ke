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
import CartPage from './pages/CartPage';
import PaymentPage from './Components/PaymentPage';
import LoginPage from './Components/LoginPage';
import AdminDashboard from './Components/AdminDashboard';
import AdminProducts from './Components/Admin/AdminProducts';
import AdminProductForm from './Components/Admin/AdminProductForm';
import AdminCategories from './Components/Admin/AdminCategories'; // Add this import
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

// Layout for pages WITHOUT Navbar
const NoNavbarLayout = ({ children }) => (
  <>
    {children}
  </>
);

const App = () => {
  return (
    <div className="App">
      <Routes>
        {/* Public Pages WITH Navbar */}
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
        
        {/* Cart page WITHOUT Navbar */}
        <Route path="/cart" element={
          <NoNavbarLayout>
            <CartPage />
          </NoNavbarLayout>
        } />
        
        {/* Admin Routes - WITHOUT Navbar & Footer */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/products/new" element={<AdminProductForm />} />
        <Route path="/admin/products/edit/:id" element={<AdminProductForm />} />
        <Route path="/admin/categories" element={<AdminCategories />} /> {/* Add this route */}
      </Routes>
    </div>
  );
};

export default App;