import React from 'react';
import ProductListHead from './ProductListHead';
import ProductListBody from './ProductListBody';

class ProductList extends React.Component {
  render() {
    return (
      <table className="table table-responsive-sm table-hover table-outline 
        mb-0"
      >
        <ProductListHead />
        <ProductListBody />
      </table>
    );
  }
}

export default ProductList;
