import React from 'react';
import BrandDetailModalHeader from './BrandDetailModalHeader';
import BrandDetailModalBody from './BrandDetailModalBody';
import BrandDetailModalFooter from './BrandDetailModalFooter';

class BrandDetailModalContent extends React.Component {
  render() {
    return (
      <div className="modal-content">
        <BrandDetailModalHeader />
        <BrandDetailModalBody />
        <BrandDetailModalFooter />
      </div>
    );
  }
}

export default BrandDetailModalContent;
