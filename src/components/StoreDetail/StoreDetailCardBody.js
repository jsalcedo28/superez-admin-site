import React from 'react';
import notFound from '../../assets/img/notfound.png';
import StoreImage from '../Stores/StoreImage';
import { StoreDetailCardBodyListener }
  from '../../listeners/Stores/StoreDetailCardBodyListener';

class StoreDetailCardBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      store: {}
    };

    StoreDetailCardBodyListener.setStoreState =
      StoreDetailCardBodyListener.setStoreState.bind(this);
  }

  render() {
    const { store } = this.state;

    return (
      <div className="card-body">
        <form className="form-horizontal">
          <div className="row">
            <div className="form-group col-sm-12">
              <label htmlFor="company">Store Name</label>
              <input
                type="text"
                className="form-control"
                id="company"
                name="name"
                placeholder="Store Name"
                value={store.name || ''}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-sm-4"></div>
            <div className="form-group col-sm-8"></div>
          </div>
          <div className="form-group">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-image" /> Store Image
                <small> Saved</small>
              </div>
              <div className="card-body">
                {
                  store.logo_url ? (
                    <StoreImage
                      id={'store-image-1'}
                      image_url={store.logo_url}
                      image_property="logo_url"
                      position="top"
                      arrow="center"
                      align="center"
                      group="valid-store"
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
            <label htmlFor="description">Store Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              placeholder="Store Description"
              value={store.description || ''}
              rows="5"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default StoreDetailCardBody;
