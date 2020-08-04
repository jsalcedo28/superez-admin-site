import React from 'react';
import BrandDetailCardBody from './BrandDetailCardBody';

class BrandDetailCard extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-header bg-primary">
          <i className="fa fa-align-justify"></i>
          <strong>Brand details</strong>
          <small> View</small>
        </div>
        <BrandDetailCardBody />
      </div>
    );
  }
}

export default BrandDetailCard;
