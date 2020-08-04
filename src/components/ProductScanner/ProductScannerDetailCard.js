import React from 'react';
import ProductScannerDetailCardBody from './ProductScannerDetailCardBody';

class ProductScannerDetailCard extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-header">
          <h2>Products Scanner</h2>
        </div>
        <ProductScannerDetailCardBody />
      </div>
    );
  }
}

export default ProductScannerDetailCard;
