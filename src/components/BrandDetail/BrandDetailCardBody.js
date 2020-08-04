import React from 'react';
import notFound from '../../assets/img/notfound.png';
import BrandImage from '../Brands/BrandImage';
import { BrandDetailCardBodyListener }
  from '../../listeners/Brands/BrandDetailCardBodyListener';

class BrandDetailCardBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      brand: {}
    };

    BrandDetailCardBodyListener.setBrandState =
      BrandDetailCardBodyListener.setBrandState.bind(this);
  }

  render() {
    const { brand } = this.state;

    return (
      <div className="card-body">
        <form className="form-horizontal">
          <div className="row">
            <div className="form-group col-sm-12">
              <label htmlFor="company">Brand Name</label>
              <input
                type="text"
                className="form-control"
                id="company"
                name="name"
                placeholder="Brand Name"
                value={brand.name || ''}
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
                <i className="fa fa-image" /> Brand Logo
                <small> Saved</small>
              </div>
              <div className="card-body">
                {
                  brand.logo_url ? (
                    <BrandImage
                      id={'brand-image-1'}
                      image_url={brand.logo_url}
                      image_property="logo_url"
                      position="top"
                      arrow="center"
                      align="center"
                      group="valid-brand"
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
            <label htmlFor="description">Brand Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              placeholder="Brand Description"
              value={brand.description || ''}
              rows="5"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default BrandDetailCardBody;
