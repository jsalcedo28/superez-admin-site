import React from 'react';
import ProductDetailModalContent from './ProductDetailModalContent';

class ProductDetailModal extends React.Component {
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
          <ProductDetailModalContent />
        </div>
      </div>
    );
  }
}

export default ProductDetailModal;
