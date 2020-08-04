import React from 'react';
import BrandBreadcrumb from './BrandBreadcrumb';
import BrandsCard from './BrandsCard';
import BrandDetailModal from '../BrandDetail/BrandDetailModal';

class BrandContent extends React.Component {
  render() {
    return (
      <main className="main">
        <BrandBreadcrumb />
        <div className="container-fluid">
          <div className="animated fadeIn">
            <div className="row">
              <div className="col-md-12">
                <BrandsCard />
              </div>
            </div>
            <BrandDetailModal />
          </div>
        </div>
      </main>
    );
  }
}

export default BrandContent;
