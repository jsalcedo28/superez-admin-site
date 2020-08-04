import React from 'react';
import notFound from '../../assets/img/notfound.png';
import BrandImage from '../Brands/BrandImage';
import { BrandDetailModalBodyListener }
  from '../../listeners/Brands/BrandDetailModalBodyListener';
import { BrandDetailModalFooterListener }
  from '../../listeners/Brands/BrandDetailModalFooterListener';
import SimpleReactValidator from 'simple-react-validator';

class BrandDetailModalBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      brand: {},
      images: [],
      submited: false,
      inputChanged: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);

    BrandDetailModalBodyListener.setBrandState =
      BrandDetailModalBodyListener.setBrandState.bind(this);

    BrandDetailModalBodyListener.getBrandState =
      BrandDetailModalBodyListener.getBrandState.bind(this);

    BrandDetailModalBodyListener.setSubmitedState =
      BrandDetailModalBodyListener.setSubmitedState.bind(this);

    BrandDetailModalBodyListener.setImagesState =
      BrandDetailModalBodyListener.setImagesState.bind(this);

    this.validator = new SimpleReactValidator();
  }

  componentDidUpdate(_, prevState) {
    if (prevState.submited !== this.state.submited) {
      if (this.state.submited) {
        if (this.validator.allValid()) {
          BrandDetailModalFooterListener.setApprovedState(true);
        } else {
          BrandDetailModalFooterListener.setApprovedState(false);

          this.validator.showMessages();

          this.forceUpdate();
        }

        this.setState({ submited: false });
      }
    }

    if (this.state.inputChanged) {
      if (!this.validator.allValid()) {
        this.validator.showMessages();

        this.forceUpdate();
      }

      BrandDetailModalFooterListener.setApprovedState(false);

      this.setState({ inputChanged: false });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    let brandCopy = JSON.parse(JSON.stringify(this.state.brand));

    brandCopy[name] = value;

    this.setState({
      inputChanged: true,
      brand: brandCopy
    });
  }

  handleGetImagesClick(brandName) {
    fetch('https://api.getsuperez.com/images', {
      method: 'POST',
      body: JSON.stringify({ name: `${brandName} logo` }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then((response) => response.json())
      .then((data) => {
        const { brand } = this.state;

        brand.logo_url = undefined;

        this.setState({ brand: brand });
        this.setState({ images: data });
      });
  }

  render() {
    const { brand, images } = this.state;

    return (
      <div
        className="modal-body"
        data-spy="scroll"
        data-target="#navbar-example1"
        data-offset={65}
        style={{
          position: 'relative',
          height: '700px',
          overflow: 'auto',
          marginTop: '.5rem',
          overflowY: 'scroll'
        }}
      >
        <div className="col-sm-12">
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
                  onChange={this.handleInputChange}
                />
                {
                  this.validator.message('name',
                    brand.name,
                    'required',
                    'text-danger')
                }
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-4"></div>
              <div className="form-group col-sm-8">
                <button
                  type="button"
                  className="btn btn-success btn-square float-right"
                  style={{
                    marginTop: '24px'
                  }}
                  onClick={() => {
                    this.handleGetImagesClick(brand.name);
                  }}
                >
                  <i className="fa fa-search" /> Images Search
                </button>
              </div>
            </div>
            <div className="form-group">
              <div
                className="card"
                style={!brand.logo_url ? { marginBottom: '0.0rem' } : {}}
              >
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
                        content="#primaryModal"
                      />
                    ) : images.length > 0 ? (

                      images.map((p, i) =>
                        <BrandImage
                          key={i}
                          id={`brand-image-${i + 1}`}
                          image_url={p}
                          image_property="logo_url"
                          position="top"
                          arrow="center"
                          align="center"
                          group="brand-images"
                          content="#primaryModal"
                        />
                      )
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
              {
                this.validator.message('logo_url',
                  brand.logo_url,
                  'required',
                  'text-danger')
              }
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
                onChange={this.handleInputChange}
              />
              {
                this.validator.message('description',
                  brand.description,
                  'required',
                  'text-danger')
              }
            </div>
          </form>
        </div>
      </div >
    );
  }
}

export default BrandDetailModalBody;
