import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
import Product from './pages/Product';
import Order from './pages/Order';
import { ProductProvider } from './context/ProductContext';
import './index.css';

function App() {
  return (
    <ProductProvider>
      <Router>
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/order" element={<Order />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </ProductProvider>
  );
}

export default App;
