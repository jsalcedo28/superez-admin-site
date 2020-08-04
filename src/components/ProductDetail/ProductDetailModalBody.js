import React from 'react';
import notFound from '../../assets/img/notfound.png';
import { ProductStatus, Units } from '../../helpers/utils';
import ProductImage from '../Products/ProductImage';
import { ProductDetailModalBodyListener }
  from '../../listeners/Products/ProductDetailModalBodyListener';
import { ProductDetailModalFooterListener }
  from '../../listeners/Products/ProductDetailModalFooterListener';
import SimpleReactValidator from 'simple-react-validator';

class ProductDetailModalBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      images: [],
      submited: false,
      inputChanged: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);

    ProductDetailModalBodyListener.setProductState =
      ProductDetailModalBodyListener.setProductState.bind(this);

    ProductDetailModalBodyListener.getProductState =
      ProductDetailModalBodyListener.getProductState.bind(this);

    ProductDetailModalBodyListener.setSubmitedState =
      ProductDetailModalBodyListener.setSubmitedState.bind(this);

    ProductDetailModalBodyListener.setImagesState =
      ProductDetailModalBodyListener.setImagesState.bind(this);

    this.validator = new SimpleReactValidator();
  }

  componentDidUpdate(_, prevState) {
    if (prevState.submited !== this.state.submited) {
      if (this.state.submited) {
        if (this.validator.allValid()) {
          ProductDetailModalFooterListener.setApprovedState(true);
        } else {
          ProductDetailModalFooterListener.setApprovedState(false);

          this.validator.showMessages();

          this.forceUpdate();
        }

        this.setState({ submited: false });
      }
    }

    if (this.state.inputChanged) {
      if (!this.validator.allValid()) {
        this.validator.showMessages();

        this.forceUpdate();
      }

      ProductDetailModalFooterListener.setApprovedState(false);

      this.setState({ inputChanged: false });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    let productCopy = JSON.parse(JSON.stringify(this.state.product));

    productCopy[name] = value;

    this.setState({
      inputChanged: true,
      product: productCopy
    });
  }

  handleGetImagesClick(productName) {
    fetch('https://api.getsuperez.com/images', {
      method: 'POST',
      body: JSON.stringify({ name: productName }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then((response) => response.json())
      .then((data) => {
        const { product } = this.state;

        product.image_url = undefined;

        this.setState({ product: product });
        this.setState({ images: data });
      });
  }

  render() {
    const { product, images } = this.state;

    return (
      <div
        className="modal-body"
        data-spy="scroll"
        data-target="#navbar-example1"
        data-offset={65}
        style={{
          position: 'relative',
          height: '700px',
          overflow: 'auto',
          marginTop: '.5rem',
          overflowY: 'scroll'
        }}
      >
        <div className="col-sm-12">
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
                  onChange={this.handleInputChange}
                />
                {
                  this.validator.message('product_name',
                    product.product_name,
                    'required',
                    'text-danger')
                }
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
              <div className="form-group col-sm-8">
                <button
                  type="button"
                  className="btn btn-success btn-square float-right"
                  style={{
                    marginTop: '24px'
                  }}
                  onClick={() => {
                    this.handleGetImagesClick(product.product_name);
                  }}
                >
                  <i className="fa fa-search" /> Images Search
                </button>
              </div>
            </div>
            <div className="form-group">
              <div
                className="card"
                style={!product.image_url ? { marginBottom: '0.0rem' } : {}}
              >
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
                        content="#primaryModal"
                      />
                    ) : images.length > 0 ? (

                      images.map((p, i) =>
                        <ProductImage
                          key={i}
                          id={`product-image-${i + 1}`}
                          image_url={p}
                          image_property="image_url"
                          position="top"
                          arrow="center"
                          align="center"
                          group="product-images"
                          content="#primaryModal"
                        />
                      )
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
              {
                this.validator.message('image_url',
                  product.image_url,
                  'required',
                  'text-danger')
              }
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
                onChange={this.handleInputChange}
              />
              {
                this.validator.message('description',
                  product.description,
                  'required',
                  'text-danger')
              }
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
                  onChange={this.handleInputChange}
                />
                {
                  this.validator.message('size',
                    product.size,
                    'required',
                    'text-danger')
                }
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="company">
                  Unit</label>
                <select
                  className="form-control"
                  id="unit"
                  name="unit"
                  value={product.unit || ''}
                  onChange={this.handleInputChange}
                >
                  <option key={0} value="">-- Select --</option>
                  {
                    Units.map((unit, i) =>
                      < option key={i + 1} value={unit.value} >{unit.name}</option>
                    )
                  }
                </select>
                {
                  this.validator.message('unit',
                    product.unit,
                    'required',
                    'text-danger')
                }
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
                onChange={this.handleInputChange}
              />
            </div>
          </form>
        </div>
      </div >
    );
  }
}

export default ProductDetailModalBody;
