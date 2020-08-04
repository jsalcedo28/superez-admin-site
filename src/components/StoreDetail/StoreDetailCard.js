import React from 'react';
import StoreDetailCardBody from './StoreDetailCardBody';

class StoreDetailCard extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-header bg-primary">
          <i className="fa fa-align-justify"></i>
          <strong>Store details</strong>
          <small> View</small>
        </div>
        <StoreDetailCardBody />
      </div>
    );
  }
}

export default StoreDetailCard;
