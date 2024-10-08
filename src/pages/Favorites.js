import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

function Favorites() {
  const { favorites, addToFavorites } = useContext(ProductContext);

  return (
    <div className="favorites">
      <div className="container">
        <h1 className="favorites__title">Избранное</h1>
        <div className="product-list">
          {favorites.map((product) => (
            <div key={product.id} className="product-item">
              <h2 className="p_cart">{product.title}</h2>
              <p className="p_cart">{product.description}</p>
              <p className="p_cart">Цена: {product.price}₽</p>
              <button
                className="product-button"
                onClick={() => addToFavorites(product)}
              >
                {product.isFavorite ? 'Удалить из избранного' : 'Удалить из избранного'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
