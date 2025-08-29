import React, { useState } from 'react';
import './DecorativeAccessories.css';

import homeAccessoriesImg from '../Images/outdoor1.webp';
import bedroomImg from '../Images/Layer_1.webp';
import kidsImg from '../Images/layer3.png';
import kitchenImg from '../Images/layer4.webp';

const decorativeCategories = [
  {
    title: 'Home Accessories',
    image: homeAccessoriesImg,
    description: 'Add elegance with stylish accents.',
  },
  {
    title: 'Bedroom',
    image: bedroomImg,
    description: 'Cozy, restful, and luxurious.',
  },
  {
    title: 'Kids',
    image: kidsImg,
    description: 'Fun & safe accessories.',
  },
  {
    title: 'Kitchen',
    image: kitchenImg,
    description: 'Essentials for every cook.',
  },
];

const DecorativeAccessories = () => {
  const [mainImage, setMainImage] = useState(homeAccessoriesImg);

  const changeMainImage = (imageSrc) => {
    setMainImage(imageSrc);
  };

  return (
    <div className="decorative-accessories">
      <h2 className="decorative-heading">Explore Decorative Accessories</h2>
      <div className="main-image-container">
        {/* Main Image */}
        <div className="main-image">
          <img src={mainImage} alt="Main Decorative" />
        </div>

        {/* Thumbnails */}
        <div className="thumbnail-container">
          {decorativeCategories.map((category, index) => (
            <div
              key={index}
              className="thumbnail-card"
              onClick={() => changeMainImage(category.image)}
            >
              <img src={category.image} alt={category.title} />
              <div className="thumbnail-description">
                <strong>{category.title}</strong><br />
                {category.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DecorativeAccessories;
