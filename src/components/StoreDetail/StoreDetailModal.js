import React from 'react';
import StoreDetailModalContent from './StoreDetailModalContent';

class StoreDetailModal extends React.Component {
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
          <StoreDetailModalContent />
        </div>
      </div>
    );
  }
}

export default StoreDetailModal;
