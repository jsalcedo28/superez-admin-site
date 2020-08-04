import React from 'react';
import { StoreDetailModalBodyListener }
  from '../../listeners/Stores/StoreDetailModalBodyListener';
import { StoreDetailModalFooterListener }
  from '../../listeners/Stores/StoreDetailModalFooterListener';
import { StoreListBodyListener }
  from '../../listeners/Stores/StoreListBodyListener';

class StoreDetailModalFooter extends React.Component {
  constructor(props) {
    super(props);

    this.state = { approved: false };

    this.handleApproveClick = this.handleApproveClick.bind(this);

    StoreDetailModalFooterListener.setApprovedState =
      StoreDetailModalFooterListener.setApprovedState.bind(this);
  }

  handleApproveClick() {
    StoreDetailModalBodyListener.setSubmitedState(true);
  }

  handleSaveStoreClick() {
    const store = StoreDetailModalBodyListener.getStoreState();

    fetch(`https://api.getsuperez.com/stores/${store._id}`, {
      method: 'PUT',
      body: JSON.stringify(store),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(() => {
        fetch('https://api.getsuperez.com/stores')
          .then((response) => response.json())
          .then((data) => {
            StoreListBodyListener.setStoresState(data);
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
          onClick={this.handleSaveStoreClick}
        >
          <i className="fa fa-save" /> Save changes
        </button>
      </div>
    );
  }
}

export default StoreDetailModalFooter;
