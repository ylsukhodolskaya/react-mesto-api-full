import mesto__logo from '../images/Mesto__logo.svg';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';

function Header(props) {
  const { loggedIn, email, logOut } = props

  const location = useLocation();
  const linkText = (location.pathname === '/sign-in') ? 'Регистрация' : 'Войти';
  const buttonText = loggedIn ? 'Выйти' : linkText;
  const linkPath = (location.pathname === '/sign-in') ? '/sign-up' : '/sign-in';

  return (
    <header className="header">
      <img
        src={mesto__logo}
        alt="Лого Место"
        className="header__logo"
      />
      <div className="header__info">
        {loggedIn && <p className="header__email">{email}</p>}
        {!loggedIn && <Link to={linkPath} className="link link_place_header" >{buttonText}</Link>}
        {loggedIn && <button type="button" className="header__link " onClick={logOut}>{buttonText}</button>}
      </div>
    </header>
  )
}

export default Header;