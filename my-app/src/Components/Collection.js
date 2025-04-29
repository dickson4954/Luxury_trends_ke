import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Collection.css'; 
import garden from '../Images/garden.jpg';
import storage from '../Images/storage.jpg';
import kitchen from '../Images/kitchen.avif';
import appliances from '../Images/appliances.jpeg';
import bedroom from '../Images/Bedroom.jpeg';
import furniture from '../Images/furniture.jpeg';
import travel from '../Images/travel.jpeg';
import PromoMarquee from './PromoMarquee'; 

const collections = [
    { name: "Garden & Outdoor", image: garden, path: "/collections/garden" },
    { name: "Storage & Organization", image: storage, path: "/collections/storage" },
    { name: "Kitchen", image: kitchen, path: "/collections/kitchen" },
    { name: "Appliances", image: appliances, path: "/collections/appliances" },
    { name: "Bedroom", image: bedroom, path: "/collections/bedroom" },
    { name: "Furniture", image: furniture, path: "/collections/furniture" },
    { name: "Travel", image: travel, path: "/collections/travel" }
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
