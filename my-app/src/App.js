import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import LandingPage from './Components/LandingPage';
import AllCollections from './Components/AllCollections';
import CollectionDetail from './Components/CollectionDetail';
import ContactPage from './Components/ContactPage';  
import Navbar from './Components/Navbar'; 
import TrendingAll from './Components/TrendingAll';
import TrendingNow from './Components/TrendingNow';
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
        <Route path="/" element={<TrendingNow />} />
        <Route path="/trending" element={<TrendingAll />} />
      </Routes>
    </div>
  );
};

export default App;
