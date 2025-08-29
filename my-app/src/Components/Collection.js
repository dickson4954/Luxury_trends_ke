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
    { name: "Cables", image: garden, path: "/collections/garden" },
    { name: "Fans $ Accesories", image: storage, path: "/collections/storage" },
    { name: "Garden Lights", image: kitchen, path: "/collections/kitchen" },
    { name: "Adaptors $ Extensions", image: appliances, path: "/collections/appliances" },
    { name: "Gate Lights", image: bedroom, path: "/collections/bedroom" },
    { name: "Luxury Chandelier Light", image: furniture, path: "/collections/furniture" },
    { name: "Solar Light", image: travel, path: "/collections/travel" }
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
