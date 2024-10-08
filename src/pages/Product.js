import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { motion } from 'framer-motion';

function Product() {
  const { id } = useParams();
  const { products, addToCart, loading } = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    if (!loading) {
      const foundProduct = products.find((product) => product.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
        setImages(foundProduct.images);
        setActiveImage(foundProduct.images[0]);
      }
    }
  }, [id, products, loading]);

  if (loading) return <p>Загрузка...</p>;
  if (!product) return <p>Тур не найден</p>;

  const handleImageChange = (e) => {
    const files = e.target.files;
    const newImages = [...images];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result);
        if (i === 0) {
          setActiveImage(reader.result);
        }
        setImages(newImages);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleImageClick = (image) => {
    setActiveImage(image);
  };

  return (
    <motion.div className="product"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container">
        <h1 className="product__title">{product.title}</h1>
        <div className="product__image-container">
          <motion.img
            src={activeImage}
            alt={product.title}
            className="product__image"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <input type="file" accept="image/*" multiple onChange={handleImageChange} />
        </div>
        <div className="product__thumbnails">
          {images.map((image, index) => (
            <motion.img
              key={index}
              src={image}
              alt={`Thumbnail ${index}`}
              className={`product__thumbnail ${image === activeImage ? 'active' : ''}`}
              onClick={() => handleImageClick(image)}
              whileHover={{ scale: 1.1 }}
            />
          ))}
        </div>
        <p>{product.description}</p>
        <p>Цена: {product.price}₽</p>
        <button onClick={() => addToCart(product)}>Добавить в корзину</button>
      </div>
    </motion.div>
  );
}

export default Product;
