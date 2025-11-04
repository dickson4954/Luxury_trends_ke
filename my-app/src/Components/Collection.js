import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Collection.css'; 
import garden from '../Images/cables.webp';
import storage from '../Images/fans.webp';
import kitchen from '../Images/garden1.webp';
import appliances from '../Images/adaptor.webp';
import bedroom from '../Images/gate.webp';
import furniture from '../Images/chandalier.webp';
import travel from '../Images/solar.webp';
import PromoMarquee from './PromoMarquee'; 

const collections = [
    { name: "Cables", image: garden, path: "/collections/cables" },
    { name: "Fans & Accessories", image: storage, path: "/collections/fans" },
    { name: "Garden Lights", image: kitchen, path: "/collections/garden-lights" },
    { name: "Adaptors & Extensions", image: appliances, path: "/collections/adaptors" },
    { name: "Gate Lights", image: bedroom, path: "/collections/gate-lights" },
    { name: "Luxury Chandelier Lights", image: furniture, path: "/collections/chandeliers" },
    { name: "Solar Lights", image: travel, path: "/collections/solar-lights" }
];

function Collections() {
  const navigate = useNavigate();

  return (
    <div className="collection-wrapper">
      <div className="collection-header">
        <h2>Collections</h2>
        <button onClick={() => navigate('/collections')} className="view-all">View all</button>
      </div>
      <div className="collection-grid">
        {collections.map((col, index) => (
          <div key={index} className="collection-image-container" onClick={() => navigate(col.path)}>
            <img src={col.image} alt={col.name} className="collection-image" />
            <h3>{col.name}</h3>
            <p>
              View collection <span className="arrow">→</span>
            </p>
          </div>
        ))}
      </div>
      <PromoMarquee />
    </div>
  );
}

export default Collections;
