import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import LandingPage from './Components/LandingPage';
import AllCollections from './Components/AllCollections';
import CollectionDetail from './Components/CollectionDetail';
import Navbar from './Components/Navbar'; 
import './App.css';

const App = () => {
  return (
    <div>
      <Navbar /> 
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/collections" element={<AllCollections />} />
        <Route path="/collections/:type" element={<CollectionDetail />} />
      </Routes>
    </div>
  );
};

export default App;
