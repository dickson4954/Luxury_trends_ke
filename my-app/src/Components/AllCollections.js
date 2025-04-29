import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AllCollections.css'; 

import garden from '../Images/garden.jpg';
import storage from '../Images/storage.jpg';
import kitchen from '../Images/kitchen.avif';
import appliances from '../Images/appliances.jpeg';
import bedroom from '../Images/Bedroom.jpeg';
import furniture from '../Images/furniture.jpeg';
import travel from '../Images/travel.jpeg';

const collections = [
  { name: "Garden & Outdoor", image: garden, path: "/collections/garden" },
  { name: "Storage & Organization", image: storage, path: "/collections/storage" },
  { name: "Kitchen", image: kitchen, path: "/collections/kitchen" },
  { name: "Appliances", image: appliances, path: "/collections/appliances" },
  { name: "Bedroom", image: bedroom, path: "/collections/bedroom" },
  { name: "Furniture", image: furniture, path: "/collections/furniture" },
  { name: "Travel", image: travel, path: "/collections/travel" }
];

function AllCollections() {
  const navigate = useNavigate();

  return (
    <div className="all-collections-page">
      <h2 className="page-title">All Collections</h2>
      <div className="collection-grid">
        {collections.map((col, index) => (
          <div key={index} className="collection-card" onClick={() => navigate(col.path)}>
            <img src={col.image} alt={col.name} className="collection-image" />
            <h3>{col.name}</h3>
            <p>
              View collection <span className="arrow">→</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllCollections;
