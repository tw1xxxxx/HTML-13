import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ProductContext } from '../context/ProductContext';
import ReCAPTCHA from "react-google-recaptcha";

function Order() {
  const { cart } = useContext(ProductContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleOrder = (data) => {
    if (captchaVerified) {
      alert('Order placed successfully!');
      // Code to send order details via email
    } else {
      alert('Please verify the captcha');
    }
  };

  return (
    <div className="order">
      <div className="container">
        <h1 className="order__title">Order</h1>
        <div className="product-list">
          {cart.map((product) => (
            <div key={product.id} className="product-item">
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>Price: {product.price}₽</p>
              <p>Quantity: {product.quantity}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit(handleOrder)}>
          <div>
            <input type="text" placeholder="Full Name" {...register('fullName', { required: true })} />
            {errors.fullName && <span>Full Name is required</span>}
          </div>
          <div>
            <input type="text" placeholder="Address" {...register('address', { required: true })} />
            {errors.address && <span>Address is required</span>}
          </div>
          <div>
            <input type="text" placeholder="Payment Method" {...register('paymentMethod', { required: true })} />
            {errors.paymentMethod && <span>Payment Method is required</span>}
          </div>
          <ReCAPTCHA
            sitekey="YOUR_RECAPTCHA_SITE_KEY"
            onChange={() => setCaptchaVerified(true)}
          />
          <button type="submit">Place Order</button>
        </form>
      </div>
    </div>
  );
}

export default Order;
