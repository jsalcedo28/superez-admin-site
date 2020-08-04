import React from 'react';
import notFound from '../../assets/img/notfound.png';
import { ProductStatus, Units } from '../../helpers/utils';
import ProductImage from '../Products/ProductImage';
import { ProductDetailCardBodyListener }
  from '../../listeners/Products/ProductDetailCardBodyListener';

class ProductDetailCardBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {}
    };

    ProductDetailCardBodyListener.setProductState =
      ProductDetailCardBodyListener.setProductState.bind(this);
  }

  render() {
    const { product } = this.state;

    return (
      <div className="card-body">
        <form className="form-horizontal">
          <div className="row">
            <div className="form-group col-sm-12">
              <label htmlFor="postal-code">UPC Number</label>
              <input
                type="text"
                className="form-control"
                id="upc"
                placeholder="UPC number"
                value={product.upc || ''}
                disabled="disabled"
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-sm-12">
              <label htmlFor="company">No Formatted Product Name</label>
              <textarea
                className="form-control"
                id="company"
                placeholder="No Formatted Name"
                value={product.no_formatted_product_name || ''}
                rows="1"
                disabled="disabled"
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-sm-12">
              <label htmlFor="company">Product Name</label>
              <textarea
                className="form-control"
                id="company"
                name="product_name"
                placeholder="Product Name"
                value={product.product_name || ''}
                rows="3"
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-sm-4">
              <label htmlFor="company">Status</label>
              <h5>
                <span className={`badge badge-pill 
                    ${product.status === ProductStatus.Valid
                    ? 'badge-success'
                    : product.status === ProductStatus.NotFoundUpcItemDb
                      ? 'badge-danger'
                      : product.status === ProductStatus.NotFoundProductCatalog
                        ? 'badge-info'
                        : product.status === ProductStatus.Archived
                          ? 'badge-dark'
                          : product.status === ProductStatus.Pending
                            ? 'badge-warning'
                            : ''}`}>{product.status}</span>
              </h5>
            </div>
            <div className="form-group col-sm-8"></div>
          </div>
          <div className="form-group">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-image" /> Product Image
                <small> Saved</small>
              </div>
              <div className="card-body">
                {
                  product.image_url ? (
                    <ProductImage
                      id={'product-image-1'}
                      image_url={product.image_url}
                      image_property="image_url"
                      position="top"
                      arrow="center"
                      align="center"
                      group="valid-product"
                      content="#root"
                      isDetail={true}
                    />
                  ) : (
                      <img
                        src={notFound}
                        alt="not found"
                        height="144"
                        width="144"
                        style={{
                          margin: '10px',
                          border: '1px solid #e0e0e0'
                        }}
                      />
                    )
                }
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="description">Product Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              placeholder="Product Description"
              value={product.description || ''}
              rows="5"
            />
          </div>
          <div className="row">
            <div className="form-group col-sm-6">
              <label htmlFor="description">Size</label>
              <input
                type="text"
                className="form-control"
                id="size"
                name="size"
                placeholder="Size"
                value={product.size || ''}
              />
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="company">
                Unit</label>
              <select
                className="form-control"
                id="unit"
                name="unit"
                value={product.unit || ''}
              >
                {
                  Units.map((unit, i) =>
                    < option key={i + 1} value={unit.value} >{unit.name}</option>
                  )
                }
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="country">Brand</label>
            <input
              type="text"
              className="form-control"
              id="brand"
              name="brand"
              placeholder="Brand name"
              value={product.brand || ''}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default ProductDetailCardBody;
