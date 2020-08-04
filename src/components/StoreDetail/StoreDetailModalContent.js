import React from 'react';
import StoreDetailModalHeader from './StoreDetailModalHeader';
import StoreDetailModalBody from './StoreDetailModalBody';
import StoreDetailModalFooter from './StoreDetailModalFooter';

class StoreDetailModalContent extends React.Component {
  render() {
    return (
      <div className="modal-content">
        <StoreDetailModalHeader />
        <StoreDetailModalBody />
        <StoreDetailModalFooter />
      </div>
    );
  }
}

export default StoreDetailModalContent;
