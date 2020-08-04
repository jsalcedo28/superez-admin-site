import React from 'react';
import Sidebar from '../Sidebar';
import ProductScannerDetailBreadcrumb from './ProductScannerDetailBreadcrumb';
import ProductScannerDetailCard from './ProductScannerDetailCard';

class ProductScannerDetailBody extends React.Component {
  render() {
    return (
      <div className="app-body">
        <Sidebar />
        <main className="main">
          <ProductScannerDetailBreadcrumb />
          <div className="container-fluid">
            <div className="animated fadeIn">
              <div className="row">
                <div className="col-md-12">
                  <ProductScannerDetailCard />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default ProductScannerDetailBody;
