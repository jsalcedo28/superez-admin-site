import React from 'react';

class SidebarItems extends React.Component {
  render() {
    return (
      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link" href="/">
            <i className="fa fa-barcode" /> Products
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/stores">
            <i className="fa fa-home" /> Stores
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/departments">
            <i className="fa fa-stack-overflow" /> Departments
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/brands">
            <i className="fa fa-stack-overflow" /> Brands
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/ezsmart">
            <i className="fa fa-image" /> EzSmart
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/community/products">
            <i className="fa fa-star" /> Product Reviews
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/community/stores">
            <i className="fa fa-star" /> Store Reviews
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/scanner">
            <i className="fa fa-barcode" /> Products Scanner
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/checkout">
            <i className="fa fa-image" /> Checkout
          </a>
        </li>
      </ul>
    );
  }
}

export default SidebarItems;
