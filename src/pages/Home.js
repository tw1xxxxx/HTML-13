import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

function Home() {
  const { products } = useContext(ProductContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await fetch('https://formspree.io/f/xrgnnznv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        closeModal();
      } else {
        console.error('Ошибка при отправке формы');
      }
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="home">
      <div className="container">
        <motion.h1
          className="home__title"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Добро пожаловать в Travel Agency
        </motion.h1>
        <motion.p
          className="home__text"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Здесь вы можете найти тур на любой вкус и кошелек.
        </motion.p>

        <div className="product-list">
          {products.slice(0, 10).map((product) => (
            <motion.div
              key={product.id}
              className="product-item"
              whileHover={{ scale: 1.05 }}
            >
              <div
                className="product-item__image"
                style={{ backgroundImage: `url(${product.images[0]})` }}
              />
              <h2 className="p_cart">{product.title}</h2>
              <p className="p_cart">{product.description}</p>
              <p className="p_cart">Цена: {product.price}₽</p>
              <Link to={`/product/${product.id}`} className="product-item__link">
                Подробнее
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Modal */}
      {showModal && (
         <motion.home
         className="modal-content"
         initial={{ y: -100, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ duration: 0.5 }}
       >
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2 class="h2_form">Форма обратной связи</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="my-form">
              <input {...register("name", { required: true })} placeholder="Ваше имя" />
              {errors.name && <span>Это поле обязательно</span>}
              <input {...register("email", { required: true })} placeholder="Ваш email" />
              {errors.email && <span>Это поле обязательно</span>}
              <textarea {...register("message", { required: true })} placeholder="Ваше сообщение" />
              {errors.message && <span>Это поле обязательно</span>}
              <button type="submit">Отправить</button>
            </form>
          </div>
        </div>
        </motion.home>
      )}
    </div>
  );
}

export default Home;
