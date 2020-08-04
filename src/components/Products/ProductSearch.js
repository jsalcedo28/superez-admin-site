import React from 'react';
import { ProductFilterListener } from '../../listeners/Products/ProductFilterListener';
import { ProductListBodyListener } from '../../listeners/Products/ProductListBodyListener';
import { ProductSearchListener } from '../../listeners/Products/ProductSearchListener';

class ProductSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      searchName: ''
    };

    this.handleSearchProductsChange = 
      this.handleSearchProductsChange.bind(this);

    ProductSearchListener.setSearchNameState =
      ProductSearchListener.setSearchNameState.bind(this);

    ProductSearchListener.getSearchNameState =
      ProductSearchListener.getSearchNameState.bind(this);
  }

  componentDidUpdate(_, prevState) {
    if (prevState.searchName !== this.state.searchName) {
      if (!this.state.searchName) {
        ProductListBodyListener.setFilteredProductsState([]);
      }
    }
  }

  handleSearchProductsChange(event) {
    const filterBy = ProductFilterListener.getFilterState();

    const searchName = event.target.value.replace(/[^a-zA-Z0-9]/g, '');

    const regexp = new RegExp(searchName, 'i');

    const products = ProductListBodyListener.getProductsState();

    let filteredProducts = filterBy === 'All'
      ? products.filter(p => regexp.test(p.product_name))
      : products.filter(p => p.status === filterBy
        && regexp.test(p.product_name));

    if (filteredProducts.length === 0) {
      filteredProducts = filterBy === 'All'
        ? products.filter(p => p.upc.indexOf(searchName) > -1)
        : products.filter(p => p.status === filterBy
          && p.upc.indexOf(searchName) > -1);
    }

    ProductListBodyListener.setFilteredProductsState(filteredProducts);

    this.setState({ searchName: event.target.value });
  }

  render() {
    const { searchName } = this.state;

    return (
      <div className="input-group ml-3">
        <div className="input-group-prepend">
          <span
            className="input-group-text bg-primary btn-square border 
              border-primary"
            id="btnGroupAddon"
          >
            <i className="icon-magnifier" />
          </span>
        </div>
        <input
          type="text"
          className="form-control btn-square border border-primary"
          placeholder="Search product(s) by UPC or name"
          aria-label="Input group example"
          aria-describedby="btnGroupAddon"
          value={searchName}
          onChange={this.handleSearchProductsChange}
        />
      </div>
    );
  }
}

export default ProductSearch;
