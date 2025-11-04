import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AllCollections.css'; 

// Import images for electrical collections
import cables from '../Images/cables.webp';
import fans from '../Images/fans.webp';
import gardenLights from '../Images/garden1.webp';
import adaptors from '../Images/adaptor.webp';
import gateLights from '../Images/gate.webp';
import chandeliers from '../Images/chandalier.webp';
import solar from '../Images/solar.webp';

const collections = [
  { name: "Cables", image: cables, path: "/collections/cables" },
  { name: "Fans & Accessories", image: fans, path: "/collections/fans" },
  { name: "Garden Lights", image: gardenLights, path: "/collections/garden-lights" },
  { name: "Adaptors & Extensions", image: adaptors, path: "/collections/adaptors" },
  { name: "Gate Lights", image: gateLights, path: "/collections/gate-lights" },
  { name: "Chandeliers", image: chandeliers, path: "/collections/chandeliers" },
  { name: "Solar Lights", image: solar, path: "/collections/solar-lights" }
];

function AllCollections() {
  const navigate = useNavigate();

  return (
    <div className="all-collections-page">
      <h2 className="page-title">All Electrical Collections</h2>
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
