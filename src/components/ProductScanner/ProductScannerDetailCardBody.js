import React from 'react';
import Loader from 'react-loader-spinner';

class ProductScannerDetailCardBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      departmentCode: '',
      categoryCode: '',
      storeCode: 0,
      batchUpcs: '',
      messages: [],
      sended: false,
      loading: false
    };

    this.handleSendBatchClick = this.handleSendBatchClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSendBatchClick() {
    const { departmentCode, categoryCode, storeCode, batchUpcs } = this.state;

    let batchUpcsArray = JSON.parse(JSON.stringify(batchUpcs))
      .split('\n');

    if (!batchUpcsArray[batchUpcsArray.length - 1]) {
      batchUpcsArray.length--;
    }

    this.setState({
      sended: true,
      messages: [],
      loading: true
    });

    const delay = (amount) => {
      return new Promise((resolve) => {
        setTimeout(resolve, amount);
      });
    }

    const request = async () => {
      let count = 1;

      for (const upc of batchUpcsArray) {
        await delay(2100);

        const productsScannerResponse = await fetch('https://api.getsuperez.com/products/scanner', {
          method: 'POST',
          body: JSON.stringify({
            department_code: departmentCode,
            category_code: categoryCode,
            store_code: Number(storeCode),
            upc: upc
          }),
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        });

        const data = await productsScannerResponse.json();

        let messagesCopy = JSON.parse(JSON.stringify(this.state.messages));

        if (count === batchUpcsArray.length) {
          messagesCopy.push(`${count} - ${data.message} .......... (Completed ${count}/${batchUpcsArray.length})`);
          messagesCopy.push('');
          messagesCopy.push('Process has been completed!');

          this.setState({
            loading: false
          });
        } else {
          messagesCopy.push(`${count} - ${data.message} .......... (Completed ${count}/${batchUpcsArray.length})`);

          count += 1;
        }

        this.setState({
          messages: messagesCopy
        });
      }
    }

    request();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (name === 'department_code') {
      this.setState({
        departmentCode: value
      });
    } else if (name === 'store_code') {
      this.setState({
        storeCode: value
      });
    } else if (name === 'category_code') {
      this.setState({
        categoryCode: value
      });
    } else if (name === 'batch_upcs') {
      this.setState({
        batchUpcs: value
      });
    }
  }

  render() {
    const {
      departmentCode,
      categoryCode,
      storeCode,
      batchUpcs,
      messages,
      loading,
      sended
    } = this.state;

    return (
      <div className="card-body">
        <form className="form-horizontal">
          <div className="row">
            <div className="form-group col-sm-6">
              <label htmlFor="city">Department Code</label>
              <input
                type="text"
                className="form-control"
                id="department_code"
                name="department_code"
                placeholder="Department Code"
                value={departmentCode || ''}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="city">Category Code</label>
              <input
                type="text"
                className="form-control"
                id="category_code"
                name="category_code"
                placeholder="Category Code"
                value={categoryCode || ''}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-sm-6">
              <label htmlFor="postal-code">Store Code</label>
              <input
                type="text"
                className="form-control"
                id="store_code"
                name="store_code"
                placeholder="Store Code"
                value={storeCode || ''}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group col-sm-6"></div>
          </div>
          <div className="form-group">
            <label htmlFor="description">Batch of UPCs</label>
            <textarea
              className="form-control"
              id="batch_upcs"
              name="batch_upcs"
              placeholder="UPCs"
              value={batchUpcs || ''}
              rows="5"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="row">
            <div className="form-group col-sm-6">
              <div className="row float-right">
                {
                  loading
                    ? (<Loader
                      type="Oval"
                      color="#008FB3"
                      height="35"
                      width="35"
                    />)
                    : (<React.Fragment />)
                }
              </div>
            </div>
            <div className="form-group col-sm-6">
              <button
                type="button"
                className="btn btn-primary btn-square float-right"
                onClick={this.handleSendBatchClick}
                disabled={batchUpcs && departmentCode && storeCode
                  ? ''
                  : 'disabled'}
              >
                <i className="fa fa-share-square" /> Send batch
              </button>
            </div>
          </div>
          {
            sended
              ? (<div className="form-group">
                <label htmlFor="description">Logs</label>
                <textarea
                  className="form-control"
                  id="messages"
                  name="messages"
                  value={messages.join('\n') || ''}
                  rows="10"
                  disabled='disabled'
                />
              </div>)
              : (<React.Fragment />)
          }
        </form>
      </div>
    );
  }
}

export default ProductScannerDetailCardBody;
