import React from 'react';
import ProductDetailCardBody from './ProductDetailCardBody';

class ProductDetailCard extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-header bg-primary">
          <i className="fa fa-align-justify"></i>
          <strong>Product details</strong>
          <small> View</small>
        </div>
        <ProductDetailCardBody />
      </div>
    );
  }
}

export default ProductDetailCard;
