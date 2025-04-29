import React from 'react';
import { useParams } from 'react-router-dom';
import './CollectionDetail.css';

import garden from '../Images/garden.jpg';
import bedroom from '../Images/bedrooms.jpg';
import kitchen from '../Images/kitchen.avif';
import furniture from '../Images/furnituree.jpg';

const collectionInfo = {
  garden: {
    title: "Garden & Outdoor",
    description:
      "Discover a world of adventure with our Camping and Outdoor Sales Collections. From sturdy tents to reliable gear, our carefully curated selection will equip you for unforgettable outdoor experiences. Shop now and embark on your next great adventure!",
    image: garden,
  },
  bedroom: {
    title: "Bedroom",
    description:
      "Create your dream bedroom with cozy, stylish essentials. From bed frames to storage, we’ve got what you need.",
    image: bedroom,
  },
  kitchen: {
    title: "Kitchen",
    description:
      "Cook up magic with our top-rated cookware, utensils, and kitchen storage solutions.",
    image: kitchen,
  },
  furniture: {
    title: "Furniture",
    description:
      "Elevate your living space with elegant, modern furniture that fits your lifestyle.",
    image: furniture,
  },
};

const allProducts = [
  { id: 1, name: 'Garden Table', image: garden, price: 150, category: 'garden' },
  { id: 2, name: 'Bed Frame', image: bedroom, price: 300, category: 'bedroom' },
  { id: 3, name: 'Cookware Set', image: kitchen, price: 90, category: 'kitchen' },
  { id: 4, name: 'Wardrobe', image: furniture, price: 450, category: 'furniture' },
];

function CollectionDetail() {
  const { type } = useParams();
  const collection = collectionInfo[type.toLowerCase()];
  const filteredProducts = allProducts.filter(
    (product) => product.category.toLowerCase() === type.toLowerCase()
  );

  if (!collection) return <p>Collection not found.</p>;

  return (
    <div className="collection-detail-page">
     
      <div className="collection-hero">
        <div className="collection-hero-text">
          <h1>
            {collection.title}{' '}
            <span className="product-count">({filteredProducts.length} products)</span>
          </h1>
          <p>{collection.description}</p>
        </div>
        <img
          src={collection.image}
          alt={collection.title}
          className="collection-hero-image"
        />
      </div>

      
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Ksh {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CollectionDetail;
