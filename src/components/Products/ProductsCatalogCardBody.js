import React from 'react';
import ProductList from './ProductList';
import Pagination from 'react-js-pagination';
import { ProductsCatalogCardBodyListener }
  from '../../listeners/Products/ProductsCatalogCardBodyListener';
import { ProductListBodyListener } from '../../listeners/Products/ProductListBodyListener';

class ProductsCatalogCardBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pagination: {
        total: 0,
        limit: 30,
        page: 1,
        pages: 0
      },
    };

    this.handlePageChange = this.handlePageChange.bind(this);

    ProductsCatalogCardBodyListener.setPaginationState =
      ProductsCatalogCardBodyListener.setPaginationState.bind(this);
  }

  handlePageChange(pageNumber) {
    let pagination = JSON.parse(JSON.stringify(this.state.pagination));

    pagination.page = pageNumber;

    ProductListBodyListener.setActivePageState(pageNumber);

    this.setState({ pagination: pagination });
  }

  render() {
    return (
      <div className="card-body">
        <ProductList />
        <div className="float-center">
          <Pagination
            activePage={this.state.pagination.page}
            itemsCountPerPage={this.state.pagination.limit}
            totalItemsCount={this.state.pagination.total}
            pageRangeDisplayed={15}
            onChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default ProductsCatalogCardBody;
