import logoPath from "./../images/logo.svg";
import React from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "./../contexts/CurrentUserContext";

function Header(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <header className="header">
      <img
        className="header__group-logo"
        src={logoPath}
        alt="логотип сайта место"
      />
      <nav className="header__menu">
        <p className="header__user-email">
          {currentUser.first_name} {currentUser.last_name}
        </p>
        <p className="header__user-email">{currentUser.email}</p>
        <Link
          to="/sign-in"
          onClick={props.onLogOut}
          className="header__sign-in-up-button_logout"
        >
          Log out
        </Link>
      </nav>
    </header>
  );
}

export default Header;
