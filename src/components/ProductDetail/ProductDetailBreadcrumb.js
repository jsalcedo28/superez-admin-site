import React from 'react';

class ProductBreadcrumb extends React.Component {
  render() {
    return (
      <ol className="breadcrumb">
        <li className="breadcrumb-item">Home</li>
        <li className="breadcrumb-item">
          <a href="/">Products</a>
        </li>
        <li className="breadcrumb-item">{this.props.upc}</li>
      </ol>
    );
  }
}

export default ProductBreadcrumb;
