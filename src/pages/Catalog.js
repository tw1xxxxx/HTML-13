import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';

function Catalog() {
  const { products, addToFavorites, addToCart } = useContext(ProductContext);
  const [searchValue, setSearchValue] = useState('');
  const [category, setCategory] = useState('');

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase()) &&
      (category === '' || product.category === category)
  );

  return (
    <div className="catalog">
      <div className="container">
        <h1 className="catalog__title">Каталог</h1>
        <div className="catalog__filters">
          <input
            type="text"
            placeholder="Поиск"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Все категории</option>
            <option value="Европа">Европа</option>
            <option value="Северная Америка">Северная Америка</option>
            <option value="Азия">Азия</option>
            <option value="Австралия">Австралия</option>
            <option value="Южная Америка">Южная Америка</option>
          </select>
        </div>
        <div className="product-list">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-item">
              <div
                className="product-item__image"
                style={{ backgroundImage: `url(${product.images[0]})` }}
              />
              <h2 className="p_cart">{product.title}</h2>
              <p className="p_cart">{product.description}</p>
              <p className="p_cart">Цена: {product.price}₽</p>
              <button className="product-button" onClick={() => addToFavorites(product)}>
                {product.isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
              </button>
              <button className="product-button" onClick={() => addToCart(product)}>
                Добавить в корзину
              </button>
              <Link to={`/product/${product.id}`} className="product-button product-item__link">
                Подробнее
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Catalog;
