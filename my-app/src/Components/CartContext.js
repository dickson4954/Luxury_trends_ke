import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const quantityToAdd = product.quantity ?? 1;

    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === product.id &&
          JSON.stringify(item.selectedAttributes || {}) === JSON.stringify(product.selectedAttributes || {})
      );

      if (existing) {
        return prev.map((item) =>
          item === existing
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: quantityToAdd }];
      }
    });
  };

  const updateQty = (id, newQty, selectedAttributes = {}) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id &&
        JSON.stringify(item.selectedAttributes || {}) === JSON.stringify(selectedAttributes)
          ? { ...item, quantity: newQty > 0 ? newQty : 1 }
          : item
      )
    );
  };

  const removeFromCart = (id, selectedAttributes = {}) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(item.id === id &&
            JSON.stringify(item.selectedAttributes || {}) === JSON.stringify(selectedAttributes))
      )
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQty, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
