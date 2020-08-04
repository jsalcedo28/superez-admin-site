import React from 'react';
import ProductBreadcrumb from './ProductBreadcrumb';
import ProductsCatalogCard from './ProductsCatalogCard';
import ProductDetailModal from '../ProductDetail/ProductDetailModal';

class ProductContent extends React.Component {
  render() {
    return (
      <main className="main">
        <ProductBreadcrumb />
        <div className="container-fluid">
          <div className="animated fadeIn">
            <div className="row">
              <div className="col-md-12">
                <ProductsCatalogCard />
              </div>
            </div>
            <ProductDetailModal />
          </div>
        </div>
      </main>
    );
  }
}

export default ProductContent;
