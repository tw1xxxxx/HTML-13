import React, { useContext, useState } from 'react';
import { ProductContext } from '../context/ProductContext';
import { useForm } from 'react-hook-form';
import Captcha from './Captcha';

function Cart() {
  const { cart } = useContext(ProductContext);
  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [showModal, setShowModal] = useState(false);
  const [captchaValid, setCaptchaValid] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");

  const onSubmit = async (data) => {
    if (!captchaValid) {
      alert('Please complete the CAPTCHA');
      return;
    }

    data.recipientEmail = recipientEmail;
    data.products = cart.map(product => ({
      title: product.title,
      price: product.price,
      quantity: product.quantity
    }));

    try {
      const response = await fetch('https://formspree.io/f/xrgnnznv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log('Форма успешно отправлена');
        closeModal();
        reset();
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
    <div className="cart">
      <div className="container">
        <h1 className="cart__title">Корзина</h1>
        <div className="product-list">
          {cart.map((product) => (
            <div key={product.id} className="product-item">
              <h2 className="p_cart">{product.title}</h2>
              <p className="p_cart">{product.description}</p>
              <p className="p_cart">Цена: {product.price}₽</p>
              <p className="p_cart">Количество: {product.quantity}</p>
            </div>
          ))}
        </div>
        <h2>Полная цена: {totalPrice}₽</h2>
        <button className="open-form-button" onClick={() => setShowModal(true)}>Открыть форму</button>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <h2 class="h2_form">Форма обратной связи</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                {cart.map((product, index) => (
                  <React.Fragment key={index}>
                    <input type="hidden" {...register(`products[${index}].title`)} value={product.title} />
                    <input type="hidden" {...register(`products[${index}].price`)} value={product.price} />
                    <input type="hidden" {...register(`products[${index}].quantity`)} value={product.quantity} />
                  </React.Fragment>
                ))}

                <input {...register("fullName", { required: true })} placeholder="Ваше полное имя" />
                {errors.fullName && <span>Это поле обязательно</span>}

                <input
                  type="email"
                  {...register("recipientEmail", { required: true })}
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="Ваш email"
                />
                {errors.recipientEmail && <span>Это поле обязательно</span>}
                <input {...register("address", { required: true })} placeholder="Ваш адрес" />
                {errors.address && <span>Это поле обязательно</span>}

                <select {...register("paymentMethod", { required: true })}>
                  <option value="">Выберите способ оплаты</option>
                  <option value="creditCard">Карта</option>
                  <option value="paypal">Наличные</option>
                </select>
                {errors.paymentMethod && <span>Это поле обязательно</span>}

                <Captcha onCaptchaChange={setCaptchaValid} />

                <button type="submit">Отправить форму</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
