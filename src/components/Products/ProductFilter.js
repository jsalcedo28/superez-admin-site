import React from 'react';
import { FilterStatus } from '../../helpers/utils';
import { ProductListBodyListener } from '../../listeners/Products/ProductListBodyListener';
import { ProductFilterListener } from '../../listeners/Products/ProductFilterListener';
import { ProductSearchListener } from '../../listeners/Products/ProductSearchListener';
import { ProductsCatalogCardBodyListener }
  from '../../listeners/Products/ProductsCatalogCardBodyListener';

class ProductFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: FilterStatus.All
    };

    ProductFilterListener.getFilterState =
      ProductFilterListener.getFilterState.bind(this);
  }

  handleGetProductsClick(filterBy) {
    const activePage = ProductListBodyListener.getActivePageState();
    const resultLimit = ProductListBodyListener.getResultLimitState();

    this.setState({ filter: filterBy });

    fetch(`https://api.getsuperez.com/products/${activePage}/${resultLimit}/${filterBy === FilterStatus.All
      ? ''
      : filterBy}`)
      .then((response) => response.json())
      .then((data) => {
        ProductSearchListener.setSearchNameState('');

        data.page = 1;

        ProductsCatalogCardBodyListener.setPaginationState(data);

        ProductListBodyListener.setProductsState(data.docs);
      });
  }

  render() {
    const { filter } = this.state;

    return (
      <div aria-label="First group" role="group" className="btn-group mr-3">
        <h5 className="mt-2 mr-1">Filter by: </h5>
        <button
          type="button"
          className={`btn btn-outline-primary 
            btn-square ${filter === FilterStatus.All
              ? 'active'
              : ''}`}
          onClick={() => this.handleGetProductsClick(FilterStatus.All)}
        >
          All
        </button>
        <button
          type="button"
          className={`btn btn-outline-success 
            btn-square ${filter === FilterStatus.Valid
              ? 'active'
              : ''}`}
          onClick={() => this.handleGetProductsClick(FilterStatus.Valid)}
        >
          Valid
        </button>
        <button
          type="button"
          className={`btn btn-outline-warning btn-square 
            ${filter === FilterStatus.Pending
              ? 'active'
              : ''}`}
          onClick={() => this.handleGetProductsClick(FilterStatus.Pending)}
        >
          Pending
        </button>
        <button
          type="button"
          className={`btn btn-outline-danger btn-square 
            ${filter === FilterStatus.NotFoundUpcItemDb
              ? 'active'
              : ''}`}
          onClick={() => this.handleGetProductsClick(FilterStatus.NotFoundUpcItemDb)}
        >
          Not found ItemDB
        </button>
        <button
          type="button"
          className={`btn btn-outline-info btn-square 
            ${filter === FilterStatus.NotFoundProductCatalog
              ? 'active'
              : ''}`}
          onClick={() => this.handleGetProductsClick(FilterStatus.NotFoundProductCatalog)}
        >
          Not found Product Catalog
        </button>
        <button
          type="button"
          className={`btn btn-outline-dark btn-square 
            ${filter === FilterStatus.Archived
              ? 'active'
              : ''}`}
          onClick={() => this.handleGetProductsClick(FilterStatus.Archived)}
        >
          Archived
        </button>
      </div>
    );
  }
}

export default ProductFilter;
