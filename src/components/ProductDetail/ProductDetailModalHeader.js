import React from 'react';

class ProductDetailModalHeader extends React.Component {
  render() {
    return (
      <div className="modal-header">
        <h4 className="modal-title">Product Details</h4>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
}

export default ProductDetailModalHeader;
