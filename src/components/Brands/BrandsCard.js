import React from 'react';
import BrandSearch from './BrandSearch';
import BrandsCardBody from './BrandsCardBody';

class BrandsCard extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-header">
          <h2>Brands</h2>
        </div>
        <div className="col-sm-12" />
        <div className="row mt-4">
          <div className="col-sm-10">
            <BrandSearch />
          </div>
        </div>
        <BrandsCardBody />
      </div>
    );
  }
}

export default BrandsCard;
