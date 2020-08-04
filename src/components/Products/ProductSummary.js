import React from 'react';
import { ProductSummaryListener } from '../../listeners/Products/ProductSummaryListener';

class ProductSummary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      validCount: 0,
      pendingForReviewCount: 0,
      notFoundUpcItemDbCount: 0,
      notFoundProductCatalogCount: 0,
      archivedCount: 0
    };

    ProductSummaryListener.setProductsState =
      ProductSummaryListener.setProductsState.bind(this);
  }

  componentDidMount() {
    fetch('https://api.getsuperez.com/products/count')
      .then((response) => response.json())
      .then((data) => this.setState({
        validCount: data.validCount,
        pendingForReviewCount: data.pendingForReviewCount,
        notFoundUpcItemDbCount: data.notFoundUpcItemDbCount,
        notFoundProductCatalogCount: data.notFoundProductCatalogCount,
        archivedCount: data.archivedCount
      }));
  }

  render() {
    const {
      validCount,
      pendingForReviewCount,
      notFoundUpcItemDbCount,
      notFoundProductCatalogCount,
      archivedCount
    } = this.state;

    const totalProducts = validCount
      + pendingForReviewCount
      + notFoundUpcItemDbCount
      + notFoundProductCatalogCount
      + archivedCount;

    return (
      <div className="row">
        <div className="col-sm-2">
          <div className="callout callout-primary">
            <small className="text-muted">Total Products</small>
            <br />
            <strong className="h4">{totalProducts}</strong>
            <div className="chart-wrapper">
              <canvas id="sparkline-chart-1" width={100} height={30} />
            </div>
          </div>
        </div>
        <div className="col-sm-2">
          <div className="callout callout-success">
            <small className="text-muted">Valid</small>
            <br />
            <strong className="h4">{validCount}</strong>
            <div className="chart-wrapper">
              <canvas id="sparkline-chart-1" width={100} height={30} />
            </div>
          </div>
        </div>
        <div className="col-sm-2">
          <div className="callout callout-warning">
            <small className="text-muted">Pending</small>
            <br />
            <strong className="h4">{pendingForReviewCount}</strong>
            <div className="chart-wrapper">
              <canvas id="sparkline-chart-1" width={100} height={30} />
            </div>
          </div>
        </div>
        <div className="col-sm-2">
          <div className="callout callout-danger">
            <small className="text-muted">Not Found UPC ItemDB</small>
            <br />
            <strong className="h4">{notFoundUpcItemDbCount}</strong>
            <div className="chart-wrapper">
              <canvas id="sparkline-chart-2" width={100} height={30} />
            </div>
          </div>
        </div>
        <div className="col-sm-2">
          <div className="callout callout-info">
            <small className="text-muted">Not Found Product Catalog</small>
            <br />
            <strong className="h4">{notFoundProductCatalogCount}</strong>
            <div className="chart-wrapper">
              <canvas id="sparkline-chart-2" width={100} height={30} />
            </div>
          </div>
        </div>
        <div className="col-sm-2">
          <div className="callout callout-dark">
            <small className="text-muted">Archived</small>
            <br />
            <strong className="h4">{archivedCount}</strong>
            <div className="chart-wrapper">
              <canvas id="sparkline-chart-2" width={100} height={30} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductSummary;
