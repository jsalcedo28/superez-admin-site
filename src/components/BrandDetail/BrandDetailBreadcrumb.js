import React from 'react';

class BrandBreadcrumb extends React.Component {
  render() {
    return (
      <ol className="breadcrumb">
        <li className="breadcrumb-item">Home</li>
        <li className="breadcrumb-item">
          <a href="/brands">Brands</a>
        </li>
        <li className="breadcrumb-item">{this.props.brandId}</li>
      </ol>
    );
  }
}

export default BrandBreadcrumb;
