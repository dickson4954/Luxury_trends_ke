// src/pages/CartPage.js
import React, { useState } from 'react';
import Cart from '../Components/Cart';

const CartPage = () => {
  // We'll keep the cart panel always open on this page
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    // Optionally, you can close the panel or redirect somewhere
    setIsOpen(false);
  };

  return (
    <div>
      <Cart isOpen={isOpen} onClose={handleClose} />
    </div>
  );
};

export default CartPage;
