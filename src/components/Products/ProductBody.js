import React from 'react';
import Sidebar from '../Sidebar';
import ProductContent from './ProductContent';

class ProductBody extends React.Component {
  render() {
    return (
      <div className="app-body">
        <Sidebar />
        <ProductContent />
      </div>
    );
  }
}

export default ProductBody;
