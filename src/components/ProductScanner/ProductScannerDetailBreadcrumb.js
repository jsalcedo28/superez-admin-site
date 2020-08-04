import React from 'react';

class ProductScannerBreadcrumb extends React.Component {
  render() {
    return (
      <ol className="breadcrumb">
        <li className="breadcrumb-item">Home</li>
        <li className="breadcrumb-item">
          <a href="/departments">Products Scanner</a>
        </li>
      </ol>
    );
  }
}

export default ProductScannerBreadcrumb;
