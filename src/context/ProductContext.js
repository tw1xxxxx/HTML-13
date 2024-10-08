import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching products...");
    axios.get('http://localhost:5000/products')
      .then(response => {
        console.log("Products fetched:", response.data);
        setProducts(response.data.map(product => ({
          ...product,
          id: Number(product.id),
          images: product.images || [] 
        })));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const addToFavorites = (product) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === product.id)) {
        return prev.filter((fav) => fav.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existingProduct = prev.find((item) => item.id === product.id);
      if (existingProduct) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <ProductContext.Provider value={{ products, favorites, cart, addToFavorites, addToCart, loading }}>
      {children}
    </ProductContext.Provider>
  );
};





// axios.get('http://localhost:5000/products')
// .then(response => {
//   console.log("Products fetched:", response.data);
//   setProducts(response.data.map(product => ({...product, id: Number(product.id)})));
//   setLoading(false);
// })
// .catch(error => {
//   console.error('Error fetching data:', error);
//   setLoading(false);
// });