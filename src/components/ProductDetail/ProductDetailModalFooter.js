import React from 'react';
import { ProductDetailModalBodyListener }
  from '../../listeners/Products/ProductDetailModalBodyListener';
import { ProductDetailModalFooterListener }
  from '../../listeners/Products/ProductDetailModalFooterListener';
import { ProductSummaryListener } from '../../listeners/Products/ProductSummaryListener';
import { ProductListBodyListener }
  from '../../listeners/Products/ProductListBodyListener';

class ProductDetailModalFooter extends React.Component {
  constructor(props) {
    super(props);

    this.state = { approved: false };

    this.handleApproveClick = this.handleApproveClick.bind(this);

    ProductDetailModalFooterListener.setApprovedState =
      ProductDetailModalFooterListener.setApprovedState.bind(this);
  }

  handleApproveClick() {
    ProductDetailModalBodyListener.setSubmitedState(true);
  }

  handleSaveProductClick() {
    const product = ProductDetailModalBodyListener.getProductState();

    product.status = 'Valid';

    if (!product.department_code) product.department_code = '';
    if (!product.category_code) product.category_code = '';
    if (!product.store_code) product.store_code = 0;
    if (!product.retail_price) product.retail_price = 0;
    if (!product.unit_price) product.unit_price = 0;
    if (!product.sale_price) product.sale_price = 0;
    if (!product.taxable) product.taxable = false;
    if (!product.ebt) product.ebt = false;
    if (!product.split) product.split = 0;
    if (!product.unit) product.unit = '';
    if (!product.coordinates) product.coordinates = {};

    product.size = parseFloat(product.size);

    fetch(`https://api.getsuperez.com/products/${product.upc}`, {
      method: 'PUT',
      body: JSON.stringify(product),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(() => {
        fetch('https://api.getsuperez.com/products')
          .then((response) => response.json())
          .then((data) => {
            ProductSummaryListener.setProductsState(data.docs);
            ProductListBodyListener.setProductsState(data.docs);
          });
      });
  }

  render() {
    const { approved } = this.state;

    return (
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondar btn-square"
          data-dismiss="modal"
        >
          Close
        </button>
        <button
          type="button"
          className="btn btn-primary btn-square"
          disabled={!approved
            ? ''
            : 'disabled'}
          onClick={this.handleApproveClick}
        >
          {
            approved
              ? (
                <React.Fragment>
                  <i className="fa fa-check" /> Approved
                </React.Fragment>
              )
              : (
                <React.Fragment>
                  <i className="fa fa-check" /> Approve
                </React.Fragment>
              )
          }
        </button>
        <button
          type="button"
          className="btn btn-success btn-square"
          data-dismiss="modal"
          disabled={approved
            ? ''
            : 'disabled'}
          onClick={this.handleSaveProductClick}
        >
          <i className="fa fa-save" /> Save changes
        </button>
      </div>
    );
  }
}

export default ProductDetailModalFooter;
