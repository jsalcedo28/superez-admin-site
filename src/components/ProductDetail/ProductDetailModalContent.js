import React from 'react';
import ProductDetailModalHeader from './ProductDetailModalHeader';
import ProductDetailModalBody from './ProductDetailModalBody';
import ProductDetailModalFooter from './ProductDetailModalFooter';

class ProductDetailModalContent extends React.Component {
  render() {
    return (
      <div className="modal-content">
        <ProductDetailModalHeader />
        <ProductDetailModalBody />
        <ProductDetailModalFooter />
      </div>
    );
  }
}

export default ProductDetailModalContent;
