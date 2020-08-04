import React from 'react';
import BrandDetailModalContent from './BrandDetailModalContent';

class BrandDetailModal extends React.Component {
  render() {
    return (
      <div
        id="primaryModal"
        className="modal fade"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-primary modal-lg" role="document">
          <BrandDetailModalContent />
        </div>
      </div>
    );
  }
}

export default BrandDetailModal;
