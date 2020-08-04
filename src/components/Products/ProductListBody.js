import React from 'react';
import promiseDelay from 'promise-delay';
import notFound from '../../assets/img/notfound.png';
import { ProductStatus } from '../../helpers/utils';
import { FilterStatus } from '../../helpers/utils';
import { ProductListBodyListener } from '../../listeners/Products/ProductListBodyListener';
import { ProductDetailModalBodyListener }
  from '../../listeners/Products/ProductDetailModalBodyListener';
import { ProductDetailModalFooterListener }
  from '../../listeners/Products/ProductDetailModalFooterListener';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ProductsCatalogCardBodyListener }
  from '../../listeners/Products/ProductsCatalogCardBodyListener';
import { ProductFilterListener } from '../../listeners/Products/ProductFilterListener';
import { ProductSearchListener } from '../../listeners/Products/ProductSearchListener';

class ProductListBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      filteredProducts: [],
      copied: false,
      copiedUpc: false,
      copiedEffect: false,
      activePage: 0,
      resultLimit: 0
    };

    ProductListBodyListener.setProductsState =
      ProductListBodyListener.setProductsState.bind(this);

    ProductListBodyListener.setFilteredProductsState =
      ProductListBodyListener.setFilteredProductsState.bind(this);

    ProductListBodyListener.setActivePageState =
      ProductListBodyListener.setActivePageState.bind(this);

    ProductListBodyListener.getProductsState =
      ProductListBodyListener.getProductsState.bind(this);

    ProductListBodyListener.getActivePageState =
      ProductListBodyListener.getActivePageState.bind(this);

    ProductListBodyListener.getResultLimitState =
      ProductListBodyListener.getResultLimitState.bind(this);
  }

  componentDidMount() {
    const activePage = this.state.activePage;
    const resultLimit = this.state.resultLimit;
    const filterBy = ProductFilterListener.getFilterState();

    fetch(`https://api.getsuperez.com/products/${activePage}/${resultLimit}/${filterBy === FilterStatus.All
      ? ''
      : filterBy}`)
      .then((response) => response.json())
      .then((data) => {
        ProductsCatalogCardBodyListener.setPaginationState(data);

        this.setState({ products: data.docs });
      });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.activePage !== this.state.activePage) {
      if (this.state.activePage) {
        const activePage = this.state.activePage;

        const resultLimit = this.state.resultLimit;

        const filterBy = ProductFilterListener.getFilterState();

        const term = ProductSearchListener.getSearchNameState();

        fetch(`https://api.getsuperez.com/products/${activePage}/${resultLimit}/${filterBy === FilterStatus.All
          ? ''
          : filterBy}`)
          .then((response) => response.json())
          .then((data) => {
            ProductsCatalogCardBodyListener.setPaginationState(data);

            if (term) {
              const searchName = term.replace(/[^a-zA-Z0-9]/g, '');

              const regexp = new RegExp(searchName, 'i');

              let filteredProducts = filterBy === 'All'
                ? data.docs.filter(p => regexp.test(p.product_name))
                : data.docs.filter(p => p.status === filterBy
                  && regexp.test(p.product_name));

              if (filteredProducts.length === 0) {
                filteredProducts = filterBy === 'All'
                  ? data.docs.filter(p => p.upc.indexOf(searchName) > -1)
                  : data.docs.filter(p => p.status === filterBy
                    && p.upc.indexOf(searchName) > -1);
              }

              this.setState({
                filteredProducts: filteredProducts,
                products: data.docs
              });
            } else {
              this.setState({ products: data.docs });
            }
          });
      }
    }
  }

  handleGetProductClick(upc) {
    const product = this.state.products.filter(p => p.upc === upc)[0];

    ProductDetailModalBodyListener.setProductState(product);
    ProductDetailModalBodyListener.setImagesState([]);

    ProductDetailModalFooterListener.setApprovedState(false);
  }

  handleCopyLinkClick(upc) {
    const product = this.state.products.filter(p => p.upc === upc)[0];

    ProductDetailModalBodyListener.setProductState(product);
    ProductDetailModalBodyListener.setImagesState([]);

    ProductDetailModalFooterListener.setApprovedState(false);
  }

  handleCopyLinkCopy(upc) {
    this.setState({ copied: true });
    this.setState({ copiedUpc: upc });
    this.setState({ copiedEffect: true });

    const interval = 2000;

    const promise = promiseDelay(interval, false);

    promise.then(() => {
      this.setState({ copiedEffect: false });
    });
  }

  render() {
    const { products, filteredProducts, copiedEffect, copiedUpc } = this.state;

    const term = ProductSearchListener.getSearchNameState();

    return (
      <tbody>
        {
          term
            ? filteredProducts.length > 0
              ? (
                filteredProducts.map((p, i) =>
                  <tr key={p.upc + p.store_code}>
                    <td className="text-center">
                      {i + 1}
                    </td>
                    <td className="text-center">
                      {p.store_code}
                    </td>
                    <td className="text-center">
                      {p.department_code}
                    </td>
                    <td className="text-center">
                      {p.category_code}
                    </td>
                    <td className="text-center">
                      <div className="avatar">
                        <img
                          src={p.image_url
                            ? p.image_url
                            : notFound}
                          className="img-avatar"
                          alt="getsuperez@gmail.com"
                        />
                        <span className={`avatar-status 
                    ${p.status === ProductStatus.Valid
                            ? 'badge-success'
                            : p.status === ProductStatus.NotFoundUpcItemDb
                              ? 'badge-danger'
                              : p.status === ProductStatus.NotFoundProductCatalog
                                ? 'badge-info'
                                : p.status === ProductStatus.Archived
                                  ? 'badge-dark'
                                  : p.status === ProductStatus.Pending
                                    ? 'badge-warning'
                                    : ''}`}></span>
                      </div>
                    </td>
                    <td className="text-center">
                      {p.upc}
                    </td>
                    <td className="text-center">
                      {p.product_name}
                    </td>
                    <td className="text-center">
                      <h5>
                        <span className={`badge badge-pill 
                    ${p.status === ProductStatus.Valid
                            ? 'badge-success'
                            : p.status === ProductStatus.NotFoundUpcItemDb
                              ? 'badge-danger'
                              : p.status === ProductStatus.NotFoundProductCatalog
                                ? 'badge-info'
                                : p.status === ProductStatus.Archived
                                  ? 'badge-dark'
                                  : p.status === ProductStatus.Pending
                                    ? 'badge-warning'
                                    : ''}`}>{p.status}</span>
                      </h5>
                    </td>
                    <td
                      className="text-center"
                      style={{
                        width: '25%'
                      }}
                    >
                      <button
                        data-toggle="modal"
                        data-target="#primaryModal"
                        type="button"
                        className="btn btn-square btn-outline-primary"
                        value={p.upc}
                        onClick={() => this.handleGetProductClick(p.upc)}
                      >
                        <i className="fa fa-eye"></i> View
                    </button>

                      <CopyToClipboard
                        text={`https://admin.getsuperez.com/products/${p.upc}`}
                        onCopy={() => this.handleCopyLinkCopy(p.upc)}>
                        {
                          copiedEffect && p.upc === copiedUpc ? (
                            <button
                              type="button"
                              className="btn btn-square btn-primary "
                            >
                              <i className="fa fa-link"></i> Copied!
                          </button>
                          ) : (
                              <button
                                type="button"
                                className="btn btn-square btn-outline-primary "
                              >
                                <i className="fa fa-link"></i> Copy Link
                          </button>
                            )
                        }
                      </CopyToClipboard>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td className="text-center" colSpan="9">
                    No results found
                </td>
                </tr>
              )
            : products.length > 0
              ? (
                products.map((p, i) =>
                  <tr key={p.upc + p.store_code}>
                    <td className="text-center">
                      {i + 1}
                    </td>
                    <td className="text-center">
                      {p.store_code}
                    </td>
                    <td className="text-center">
                      {p.department_code}
                    </td>
                    <td className="text-center">
                      {p.category_code}
                    </td>
                    <td className="text-center">
                      <div className="avatar">
                        <img
                          src={p.image_url
                            ? p.image_url
                            : notFound}
                          className="img-avatar"
                          alt="getsuperez@gmail.com"
                        />
                        <span className={`avatar-status 
                ${p.status === ProductStatus.Valid
                            ? 'badge-success'
                            : p.status === ProductStatus.NotFoundUpcItemDb
                              ? 'badge-danger'
                              : p.status === ProductStatus.NotFoundProductCatalog
                                ? 'badge-info'
                                : p.status === ProductStatus.Archived
                                  ? 'badge-dark'
                                  : p.status === ProductStatus.Pending
                                    ? 'badge-warning'
                                    : ''}`}></span>
                      </div>
                    </td>
                    <td className="text-center">
                      {p.upc}
                    </td>
                    <td className="text-center">
                      {p.product_name}
                    </td>
                    <td className="text-center">
                      <h5>
                        <span className={`badge badge-pill 
                ${p.status === ProductStatus.Valid
                            ? 'badge-success'
                            : p.status === ProductStatus.NotFoundUpcItemDb
                              ? 'badge-danger'
                              : p.status === ProductStatus.NotFoundProductCatalog
                                ? 'badge-info'
                                : p.status === ProductStatus.Archived
                                  ? 'badge-dark'
                                  : p.status === ProductStatus.Pending
                                    ? 'badge-warning'
                                    : ''}`}>{p.status}</span>
                      </h5>
                    </td>
                    <td
                      className="text-center"
                      style={{
                        width: '25%'
                      }}
                    >
                      <button
                        data-toggle="modal"
                        data-target="#primaryModal"
                        type="button"
                        className="btn btn-square btn-outline-primary"
                        value={p.upc}
                        onClick={() => this.handleGetProductClick(p.upc)}
                      >
                        <i className="fa fa-eye"></i> View
                </button>
                      <CopyToClipboard
                        text={`https://admin.getsuperez.com/products/${p.upc}`}
                        onCopy={() => this.handleCopyLinkCopy(p.upc)}>
                        {
                          copiedEffect && p.upc === copiedUpc ? (
                            <button
                              type="button"
                              className="btn btn-square btn-primary "
                            >
                              <i className="fa fa-link"></i> Copied!
                      </button>
                          ) : (
                              <button
                                type="button"
                                className="btn btn-square btn-outline-primary "
                              >
                                <i className="fa fa-link"></i> Copy Link
                      </button>
                            )
                        }
                      </CopyToClipboard>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td className="text-center" colSpan="9">
                    No results found
                </td>
                </tr>
              )
        }
      </tbody>
    );
  }
}

export default ProductListBody;
