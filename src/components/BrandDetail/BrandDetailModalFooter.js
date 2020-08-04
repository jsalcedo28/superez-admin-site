import React from 'react';
import { BrandDetailModalBodyListener }
  from '../../listeners/Brands/BrandDetailModalBodyListener';
import { BrandDetailModalFooterListener }
  from '../../listeners/Brands/BrandDetailModalFooterListener';
import { BrandListBodyListener }
  from '../../listeners/Brands/BrandListBodyListener';

class BrandDetailModalFooter extends React.Component {
  constructor(props) {
    super(props);

    this.state = { approved: false };

    this.handleApproveClick = this.handleApproveClick.bind(this);

    BrandDetailModalFooterListener.setApprovedState =
      BrandDetailModalFooterListener.setApprovedState.bind(this);
  }

  handleApproveClick() {
    BrandDetailModalBodyListener.setSubmitedState(true);
  }

  handleSaveBrandClick() {
    const brand = BrandDetailModalBodyListener.getBrandState();

    fetch(`https://api.getsuperez.com/brands/${brand._id}`, {
      method: 'PUT',
      body: JSON.stringify(brand),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(() => {
        fetch('https://api.getsuperez.com/brands')
          .then((response) => response.json())
          .then((data) => {
            BrandListBodyListener.setBrandsState(data);
          });
      });
  }

  render() {
    const { approved } = this.state;

    return (
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondar btn-square"
          data-dismiss="modal"
        >
          Close
        </button>
        <button
          type="button"
          className="btn btn-primary btn-square"
          disabled={!approved
            ? ''
            : 'disabled'}
          onClick={this.handleApproveClick}
        >
          {
            approved
              ? (
                <React.Fragment>
                  <i className="fa fa-check" /> Approved
                </React.Fragment>
              )
              : (
                <React.Fragment>
                  <i className="fa fa-check" /> Approve
                </React.Fragment>
              )
          }
        </button>
        <button
          type="button"
          className="btn btn-success btn-square"
          data-dismiss="modal"
          disabled={approved
            ? ''
            : 'disabled'}
          onClick={this.handleSaveBrandClick}
        >
          <i className="fa fa-save" /> Save changes
        </button>
      </div>
    );
  }
}

export default BrandDetailModalFooter;
