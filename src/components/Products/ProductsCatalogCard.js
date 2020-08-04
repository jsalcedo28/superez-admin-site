import React from 'react';
import ProductSummary from './ProductSummary';
import ProductSearch from './ProductSearch';
import ProductFilter from './ProductFilter';
import ProductsCatalogCardBody from './ProductsCatalogCardBody';

class ProductsCatalogCard extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-header">
          <h2>Products</h2>
        </div>
        <div className="col-sm-12" />
        <div className="col-sm-12">
          <ProductSummary />
          <hr className="mt-0" />
        </div>
        <div className="row mt-4">
          <div className="col-sm-8">
            <ProductSearch />
          </div>
        </div>
        <div className="row mt-4">
          <div className="d-none d-sm-inline-block col col-sm-12">
            <div className="float-right btn-toolbar">
              <ProductFilter />
            </div>
          </div>
        </div>
        <ProductsCatalogCardBody />
      </div>
    );
  }
}

export default ProductsCatalogCard;
