import React from 'react';
import logo from '../assets/img/logo.png';
import iconColor from '../assets/img/icon-color.png';

class NavbarBrand extends React.Component {
  render() {
    return (
      <a className="navbar-brand" href="/">
        <img
          className="navbar-brand-full"
          src={logo}
          width={160}
          height={60}
          alt="SuperEz Logo"
        />
        <img
          className="navbar-brand-minimized"
          src={iconColor}
          width={45}
          height={30}
          alt="SuperEz Logo"
        />
      </a>
    );
  }
}

export default NavbarBrand;
