import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/catalog">Туры</Link>
        <Link to="/favorites">Избранное</Link>
        <Link to="/cart">Корзина</Link>
      </nav>
    </header>
  );
}

export default Header;
