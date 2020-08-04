import React from 'react';
import Sidebar from '../Sidebar';
import StoreDetailBreadcrumb from './StoreDetailBreadcrumb';
import StoreDetailCard from './StoreDetailCard';
import { StoreDetailCardBodyListener }
  from '../../listeners/Stores/StoreDetailCardBodyListener';

class StoreDetailBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      storeId: props.match.params.storeId || ''
    };
  }

  componentDidMount() {
    fetch(`https://api.getsuperez.com/stores/${this.state.storeId}`)
      .then((response) => response.json())
      .then((data) => {
        StoreDetailCardBodyListener.setStoreState(data);
      });
  }

  render() {
    return (
      <div className="app-body">
        <Sidebar />
        <main className="main">
          <StoreDetailBreadcrumb storeId={this.state.storeId} />
          <div className="container-fluid">
            <div className="animated fadeIn">
              <div className="row">
                <div className="col-md-12">
                  <StoreDetailCard />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default StoreDetailBody;
