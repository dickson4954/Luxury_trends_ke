import React, { useState } from 'react';
import './DecorativeAccessories.css';

import homeAccessoriesImg from '../Images/outdoor1.webp';
import bedroomImg from '../Images/Layer_1.webp';
import kidsImg from '../Images/layer3.png';
import kitchenImg from '../Images/layer4.webp';

const decorativeCategories = [
  {
    title: 'Decorative Lighting',
    image: homeAccessoriesImg,
    description: 'Elegant lamps and artistic light fixtures.',
  },
  {
    title: 'Smart Home Decor',
    image: bedroomImg,
    description: 'Tech-integrated decorative solutions.',
  },
  {
    title: 'LED Art & Signs',
    image: kidsImg,
    description: 'Illuminated wall art and decorative signs.',
  },
  {
    title: 'Modern Switch Plates',
    image: kitchenImg,
    description: 'Stylish electrical outlet covers.',
  },
];

const DecorativeAccessories = () => {
  const [mainImage, setMainImage] = useState(homeAccessoriesImg);

  const changeMainImage = (imageSrc) => {
    setMainImage(imageSrc);
  };

  return (
    <div className="decorative-accessories">
      <h2 className="decorative-heading">Explore Electrical Decor</h2>
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