import React from 'react';
import Sidebar from '../Sidebar';
import BrandDetailBreadcrumb from './BrandDetailBreadcrumb';
import BrandDetailCard from './BrandDetailCard';
import { BrandDetailCardBodyListener }
  from '../../listeners/Brands/BrandDetailCardBodyListener';

class BrandDetailBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      brandId: props.match.params.brandId || ''
    };
  }

  componentDidMount() {
    fetch(`https://api.getsuperez.com/brands/${this.state.brandId}`)
      .then((response) => response.json())
      .then((data) => {
        BrandDetailCardBodyListener.setBrandState(data);
      });
  }

  render() {
    return (
      <div className="app-body">
        <Sidebar />
        <main className="main">
          <BrandDetailBreadcrumb brandId={this.state.brandId} />
          <div className="container-fluid">
            <div className="animated fadeIn">
              <div className="row">
                <div className="col-md-12">
                  <BrandDetailCard />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default BrandDetailBody;
