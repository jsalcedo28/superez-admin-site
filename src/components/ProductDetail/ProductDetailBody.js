import React from 'react';
import Sidebar from '../Sidebar';
import ProductDetailBreadcrumb from './ProductDetailBreadcrumb';
import ProductDetailCard from './ProductDetailCard';
import { ProductDetailCardBodyListener }
  from '../../listeners/Products/ProductDetailCardBodyListener';

class ProductDetailBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      upc: props.match.params.upc || ''
    };
  }

  componentDidMount() {
    fetch(`https://api.getsuperez.com/products/${this.state.upc}`)
      .then((response) => response.json())
      .then((data) => {
        ProductDetailCardBodyListener.setProductState(data);
      });
  }

  render() {
    return (
      <div className="app-body">
        <Sidebar />
        <main className="main">
          <ProductDetailBreadcrumb upc={this.state.upc} />
          <div className="container-fluid">
            <div className="animated fadeIn">
              <div className="row">
                <div className="col-md-12">
                  <ProductDetailCard />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default ProductDetailBody;
