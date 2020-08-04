import React from 'react';
import notFound from '../../assets/img/notfound.png';
import StoreImage from '../Stores/StoreImage';
import { StoreDetailModalBodyListener }
  from '../../listeners/Stores/StoreDetailModalBodyListener';
import { StoreDetailModalFooterListener }
  from '../../listeners/Stores/StoreDetailModalFooterListener';
import SimpleReactValidator from 'simple-react-validator';
import FileInput from 'react-simple-file-input';
import MaskedInput from 'react-text-mask';

const typeList = [
  { name: 'Standalone Store', value: 'standalone_store' },
  { name: 'In Mall Store', value: 'in_mall_store' },
  { name: 'Consolidation Store', value: 'consolidation_store' }
];

const categoryList = [
  { name: 'Groceries', value: 'Groceries' },
  { name: 'Organic', value: 'Organic' },
  { name: 'Specialty', value: 'Specialty' },
  { name: 'Butcher Shop', value: 'Butcher Shop' }
];

class StoreDetailModalBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      store: {},
      images: [],
      submited: false,
      inputChanged: false,
      binaryImage: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFileSelected = this.handleFileSelected.bind(this);

    StoreDetailModalBodyListener.setStoreState =
      StoreDetailModalBodyListener.setStoreState.bind(this);

    StoreDetailModalBodyListener.getStoreState =
      StoreDetailModalBodyListener.getStoreState.bind(this);

    StoreDetailModalBodyListener.setSubmitedState =
      StoreDetailModalBodyListener.setSubmitedState.bind(this);

    StoreDetailModalBodyListener.setImagesState =
      StoreDetailModalBodyListener.setImagesState.bind(this);

    this.validator = new SimpleReactValidator();
  }

  componentDidUpdate(_, prevState) {
    if (prevState.submited !== this.state.submited) {
      if (this.state.submited) {
        if (this.validator.allValid()) {
          StoreDetailModalFooterListener.setApprovedState(true);
        } else {
          StoreDetailModalFooterListener.setApprovedState(false);

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

      StoreDetailModalFooterListener.setApprovedState(false);

      this.setState({ inputChanged: false });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    let storeCopy = JSON.parse(JSON.stringify(this.state.store));

    if (storeCopy && storeCopy.address) {
      storeCopy.address.state = 'New York, NY';
      storeCopy.address.country = 'United States';
    }

    if (name.indexOf('[') > -1 && name.indexOf('.') > -1) {
      const properties = name.split('.');

      const firstIndexSpecialChar = properties[0].lastIndexOf('[');

      const position = properties[0].substring(firstIndexSpecialChar + 1,
        properties[0].lastIndexOf(']'));

      const firstProperty = properties[0].substring(0, firstIndexSpecialChar);

      storeCopy[firstProperty][position][properties[1]] = value;
    } else if (name.indexOf('.') > -1) {
      const properties = name.split('.');

      storeCopy[properties[0]][properties[1]] = value;
    } else {
      storeCopy[name] = value;
    }

    this.setState({
      inputChanged: true,
      store: storeCopy
    });
  }

  handleGetImagesClick(storeName) {
    fetch('https://api.getsuperez.com/images', {
      method: 'POST',
      body: JSON.stringify({ name: storeName }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then((response) => response.json())
      .then((data) => {
        const { store } = this.state;

        store.logo_url = undefined;

        this.setState({ store: store });
        this.setState({ images: data });
      });
  }

  handleFileSelected(event) {
    const base64Image = `data:image/jpeg;base64,${btoa(event.target.result)}`;

    let storeCopy = JSON.parse(JSON.stringify(this.state.store));

    storeCopy.image_url = base64Image;

    this.setState({
      binaryImage: base64Image,
      store: storeCopy
    });
  }

  render() {
    const { store, images, binaryImage } = this.state;

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
            <div id="accordion" role="tablist">
              <div className="card">
                <div className="card-header" role="tab" id="headingOne">
                  <h5 className="mb-0">
                    <a data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      Basic information
                    </a>
                  </h5>
                </div>

                <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
                  <div className="card-body">
                    <div className="row">
                      <div className="form-group col-sm-2">
                        <label htmlFor="company">Store Code</label>
                        <input
                          type="text"
                          style={{ direction: 'rtl' }}
                          className="form-control"
                          id="company"
                          name="store_code"
                          placeholder="Store Code"
                          value={store.store_code || ''}
                          disabled="disabled"
                        />
                        {
                          this.validator.message('store_code',
                            store.store_code,
                            'required',
                            'text-danger')
                        }
                      </div>
                      <div className="form-group col-sm-10">
                        <label htmlFor="company">Store Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="company"
                          name="name"
                          placeholder="Store Name"
                          value={store.name || ''}
                          onChange={this.handleInputChange}
                        />
                        {
                          this.validator.message('name',
                            store.name,
                            'required',
                            'text-danger')
                        }
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
                        onChange={this.handleInputChange}
                      />
                      {
                        this.validator.message('description',
                          store.description,
                          'required',
                          'text-danger')
                      }
                    </div>
                    <div className="row">
                      <div className="form-group col-sm-6">
                        <label htmlFor="company">Contact Phone</label>
                        <MaskedInput
                          mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                          className="form-control"
                          placeholder="Enter a phone number"
                          guide={false}
                          name="contact_phone"
                          id="company"
                          value={store.contact_phone || ''}
                          onChange={this.handleInputChange}
                        />
                        {
                          this.validator.message('contact_phone',
                            store.contact_phone,
                            'required',
                            'text-danger')
                        }
                      </div>
                      <div className="form-group col-sm-6">
                        <label htmlFor="company">E-mail</label>
                        <input
                          type="email"
                          className="form-control"
                          id="company"
                          name="email"
                          placeholder="emailname@email.com"
                          value={store.email || ''}
                          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                          onChange={this.handleInputChange}
                        />
                        {
                          this.validator.message('email',
                            store.email,
                            'required|email',
                            'text-danger')
                        }
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-sm-4">
                        <label htmlFor="company">Categories</label>
                        <select
                          className="form-control"
                          id="company"
                          name="category_1"
                          value={store.category_1 || ''}
                          onChange={this.handleInputChange}
                        >
                          {
                            categoryList.map((category, i) =>
                              (category.value !== store.category_2
                                && category.value !== store.category_3) &&
                              < option key={i + 1} value={category.value} >{category.name}</option>
                            )
                          }
                        </select>
                        {
                          this.validator.message('category_1',
                            store.category_1,
                            'required',
                            'text-danger')
                        }
                      </div>
                      <div className="form-group col-sm-4">
                        <label htmlFor="company">&nbsp;</label>
                        <select
                          className="form-control"
                          id="company"
                          name="category_2"
                          value={store.category_2 || ''}
                          onChange={this.handleInputChange}
                        >
                          <option key={0} value="">-- Select --</option>
                          {
                            categoryList.map((category, i) =>
                              (category.value !== store.category_1
                                && category.value !== store.category_3) &&
                              < option key={i + 1} value={category.value} >{category.name}</option>
                            )
                          }
                        </select>
                      </div>
                      <div className="form-group col-sm-4">
                        <label htmlFor="company">&nbsp;</label>
                        <select
                          className="form-control"
                          id="company"
                          name="category_3"
                          placeholder="Categories"
                          value={store.category_3 || ''}
                          onChange={this.handleInputChange}
                        >
                          <option key={0} value="">-- Select --</option>
                          {
                            categoryList.map((category, i) =>
                              (category.value !== store.category_1
                                && category.value !== store.category_2) &&
                              < option key={i + 1} value={category.value} >{category.name}</option>
                            )
                          }
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" role="tab" id="headingTwo">
                  <h5 className="mb-0">
                    <a className="collapsed" data-toggle="collapse" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      Schedules
                    </a>
                  </h5>
                </div>
                <div id="collapseTwo" className="collapse" role="tabpanel" aria-labelledby="headingTwo" data-parent="#accordion">
                  <div className="card-body">
                    <div className="form-group row">
                      <label
                        htmlFor="company"
                        className="col-sm-6 col-form-label"
                      >&nbsp;</label>
                      <label
                        htmlFor="company"
                        className="col-sm-3 col-form-label"
                      >Open time</label>
                      <label
                        htmlFor="company"
                        className="col-sm-3 col-form-label"
                      >Close time</label>
                    </div>
                    <div className="form-group row">
                      {
                        store.schedules &&
                        store.schedules.map((schedule, i) =>
                          <React.Fragment key={i}>
                            <label
                              htmlFor="company"
                              className="col-sm-6 col-form-label"
                            >{schedule.day}</label>
                            <input
                              type="time"
                              className="form-control col-sm-3"
                              id="company"
                              name={`schedules[${i}].start_date`}
                              placeholder="Start date"
                              value={schedule.start_date}
                              onChange={this.handleInputChange}
                            />
                            <input
                              type="time"
                              className="form-control col-sm-3"
                              id="company"
                              name={`schedules[${i}].end_date`}
                              placeholder="End date"
                              value={schedule.end_date}
                              onChange={this.handleInputChange}
                            />
                          </React.Fragment>
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" role="tab" id="headingThree">
                  <h5 className="mb-0">
                    <a className="collapsed" data-toggle="collapse" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      Logo and Store image
                    </a>
                  </h5>
                </div>
                <div id="collapseThree" className="collapse" role="tabpanel" aria-labelledby="headingThree" data-parent="#accordion">
                  <div className="card-body">
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
                            this.handleGetImagesClick(store.name);
                          }}
                        >
                          <i className="fa fa-search" /> Images Search
                        </button>
                      </div>
                    </div>
                    <div className="form-group">
                      <div
                        className="card"
                        style={!store.logo_url ? { marginBottom: '0.0rem' } : {}}
                      >
                        <div className="card-header">
                          <i className="fa fa-image" /> Store Logo
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
                                content="#primaryModal"
                              />
                            ) : images.length > 0 ? (

                              images.map((p, i) =>
                                <StoreImage
                                  key={i}
                                  id={`store-image-${i + 1}`}
                                  image_url={p}
                                  image_property="logo_url"
                                  position="top"
                                  arrow="center"
                                  align="center"
                                  group="store-images"
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
                        this.validator.message('image_url',
                          store.logo_url,
                          'required',
                          'text-danger')
                      }
                    </div>
                    <div className="row">
                      <div className="form-group col-sm-12">
                        <FileInput
                          readAs='binary'
                          multiple
                          onLoad={this.handleFileSelected}
                          style={{
                            marginTop: '24px'
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div
                        className="card"
                        style={!store.image_url ? { marginBottom: '0.0rem' } : {}}
                      >
                        <div className="card-header">
                          <i className="fa fa-image" /> Store Image
                          <small> Saved</small>
                        </div>
                        <div className="card-body">
                          {
                            binaryImage ? (
                              <StoreImage
                                id={'store-image-url'}
                                image_url={binaryImage}
                                image_property="image_url"
                                position="top"
                                arrow="center"
                                align="center"
                                group="valid-store"
                                content="#primaryModal"
                              />
                            ) : store.image_url ? (
                              <StoreImage
                                id={'store-image-url'}
                                image_url={store.image_url}
                                image_property="image_url"
                                position="top"
                                arrow="center"
                                align="center"
                                group="valid-store"
                                content="#primaryModal"
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
                      {
                        this.validator.message('image_url',
                          store.image_url,
                          'required',
                          'text-danger')
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" role="tab" id="headingFour">
                  <h5 className="mb-0">
                    <a className="collapsed" data-toggle="collapse" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                      Address
                    </a>
                  </h5>
                </div>
                <div id="collapseFour" className="collapse" role="tabpanel" aria-labelledby="headingFour" data-parent="#accordion">
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="company">Address Line 1</label>
                      <input
                        type="text"
                        className="form-control"
                        id="company"
                        name="address.address_line_1"
                        placeholder="Address Line 1"
                        value={store.address
                          ? store.address.address_line_1 || ''
                          : store.address || ''}
                        onChange={this.handleInputChange}
                      />
                      {
                        this.validator.message('address.address_line_1',
                          store.address
                            ? store.address.address_line_1
                            : store.address,
                          'required',
                          'text-danger')
                      }
                    </div>
                    <div className="form-group">
                      <label htmlFor="company">Address Line 2</label>
                      <input
                        type="text"
                        className="form-control"
                        id="company"
                        name="address.address_line_2"
                        placeholder="Suite / Apartment"
                        value={store.address
                          ? store.address.address_line_2 || ''
                          : store.address || ''}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="row">
                      <div className="form-group col-sm-6">
                        <label htmlFor="company">City</label>
                        <input
                          type="text"
                          className="form-control"
                          id="company"
                          name="address.city"
                          placeholder="City"
                          value={store.address
                            ? store.address.city || ''
                            : store.address || ''}
                          onChange={this.handleInputChange}
                        />
                        {
                          this.validator.message('address.city',
                            store.address
                              ? store.address.city
                              : store.address,
                            'required',
                            'text-danger')
                        }
                      </div>
                      <div className="form-group col-sm-6">
                        <label htmlFor="company">Zip Code</label>
                        <input
                          type="text"
                          style={{ direction: 'rtl' }}
                          className="form-control"
                          id="company"
                          name="address.zip_code"
                          placeholder="Zip Code"
                          value={store.address
                            ? store.address.zip_code || ''
                            : store.address || ''}
                          onChange={this.handleInputChange}
                        />
                        {
                          this.validator.message('address.zip_code',
                            store.address
                              ? store.address.zip_code
                              : store.address,
                            'required',
                            'text-danger')
                        }
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-sm-6">
                        <label htmlFor="company">State</label>
                        <input
                          type="text"
                          className="form-control"
                          id="company"
                          name="address.state"
                          placeholder="State"
                          value={store.address
                            ? store.address.state || ''
                            : store.address || ''}
                          disabled="disabled"
                        />
                      </div>
                      <div className="form-group col-sm-6">
                        <label htmlFor="company">Country</label>
                        <input
                          type="text"
                          className="form-control"
                          id="company"
                          name="address.country"
                          placeholder="Country"
                          value={store.address
                            ? store.address.country || ''
                            : store.address || ''}
                          disabled="disabled"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" role="tab" id="headingFive">
                  <h5 className="mb-0">
                    <a className="collapsed" data-toggle="collapse" href="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                      Delivery information
                    </a>
                  </h5>
                </div>
                <div id="collapseFive" className="collapse" role="tabpanel" aria-labelledby="headingFive" data-parent="#accordion">
                  <div className="card-body">
                    <div className="row">
                      <div className="form-group col-sm-6">
                        <label htmlFor="company">Type</label>
                        <select
                          className="form-control"
                          id="company"
                          name="type"
                          value={store.type || ''}
                          onChange={this.handleInputChange}
                        >
                          <option value="">-- Select --</option>
                          {
                            typeList.map((type, i) =>
                              <option key={i} value={type.value}>{type.name}</option>
                            )
                          }
                        </select>
                        {
                          this.validator.message('type',
                            store.type,
                            'required',
                            'text-danger')
                        }
                      </div>
                      <div className="form-group col-sm-6">
                        <label htmlFor="company">Package Preparation Length (Minutes)</label>
                        <input
                          type="number"
                          style={{ direction: 'rtl' }}
                          className="form-control"
                          id="company"
                          name="package_prep_length"
                          placeholder="Package Preparation Length"
                          value={store.package_prep_length || 0}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-sm-4">
                        <label htmlFor="company">Signature Age Requirement</label>
                        <input
                          type="checkbox"
                          className="form-control"
                          id="company"
                          name="signature_age_requirement_default"
                          checked={store.signature_age_requirement_default || false}
                          onChange={this.handleInputChange}
                        />
                      </div>
                      <div className="form-group col-sm-4">
                        <label htmlFor="company">Offers Delivery</label>
                        <input
                          type="checkbox"
                          className="form-control"
                          id="company"
                          name="offers_delivery"
                          checked={store.offers_delivery || false}
                          onChange={this.handleInputChange}
                        />
                      </div>
                      <div className="form-group col-sm-4">
                        <label htmlFor="company">Offers Fetches</label>
                        <input
                          type="checkbox"
                          className="form-control"
                          id="company"
                          name="offers_fetches"
                          checked={store.offers_fetches || false}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div >
    );
  }
}

export default StoreDetailModalBody;
