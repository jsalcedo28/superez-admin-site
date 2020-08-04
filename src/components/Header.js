import React from 'react';
import NavbarBrand from './NavbarBrand';
import NavbarItems from './NavbarItems';

class Header extends React.Component {
  render() {
    return (
      <header className="app-header navbar">
        <button
          className="navbar-toggler sidebar-toggler d-lg-none mr-auto"
          type="button"
          data-toggle="sidebar-show"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <NavbarBrand />
        <button
          className="navbar-toggler sidebar-toggler d-md-down-none"
          type="button"
          data-toggle="sidebar-lg-show"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <NavbarItems />
      </header>
    );
  }
}

export default Header;
