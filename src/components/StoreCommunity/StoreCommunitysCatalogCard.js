import React from 'react';
import notFound from '../../assets/img/notfound.png';
import StoreCommunityCatalogCardBody from './StoreCommunityCatalogCardBody';
import { StoreCommunityCatalogCardListener } from '../../listeners/StoreCommunity/StoreCommunityCatalogCardListener';
import { StoreCommunityListBodyListener } from '../../listeners/StoreCommunity/StoreCommunityListBodyListener';

class StoreCommunityCatalogCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cartItems: [],
      ezSmartCartItems: []
    };

    StoreCommunityCatalogCardListener.setCartItemsState =
      StoreCommunityCatalogCardListener.setCartItemsState.bind(this);

    StoreCommunityCatalogCardListener.setStoreCommunityCartItemsState =
      StoreCommunityCatalogCardListener.setStoreCommunityCartItemsState.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:63355/api/carts/items/5b08b53561f86e42ca98af29')
      .then((response) => response.json())
      .then((data) => {
        StoreCommunityListBodyListener.setCartItemsState(data);

        this.setState({ cartItems: data });
      });

    fetch('http://localhost:63355/api/carts/ezSmart/5b08266ef15c53c020fd2edf')
      .then((response) => response.json())
      .then((data) => this.setState({ ezSmartCartItems: data }));
  }

  componentDidUpdate() {
    const { cartItems } = this.state;

    StoreCommunityListBodyListener.setCartItemsState(cartItems);
  }

  handleChooseOptionClick(optionNumber) {
    fetch(`http://localhost:63355/api/carts/ezSmart/choose/5b08266ef15c53c020fd2edf/${optionNumber}`, {
      method: 'POST'
    })
      .then(() => {
        fetch('http://localhost:63355/api/carts/items/5b08b53561f86e42ca98af29')
          .then((response) => response.json())
          .then((data) => {
            this.setState({ cartItems: data });
          });

        fetch('http://localhost:63355/api/carts/ezSmart/5b08266ef15c53c020fd2edf')
          .then((response) => response.json())
          .then((data) => {
            this.setState({ ezSmartCartItems: data });
          });
      });
  }

  render() {
    const { cartItems, ezSmartCartItems } = this.state;

    return (
      <div className="card">
        <div className="card-header">
          <h2>Checkout</h2>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="card-body">
              <h5>My cart</h5>
              <table className="table table-responsive-sm table-hover table-outline 
        mb-0"
              >
                <thead className="thead-light">
                  <tr>
                    <th className="text-center">Store Code</th>
                    <th className="text-center">
                      <i className="icon-picture"></i>
                    </th>
                    <th className="text-center">Store Name</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-center">Unit Price</th>
                    <th className="text-center">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    cartItems.length > 0
                      ? (
                        cartItems.map((p) =>
                          <tr key={p.upc + p.store_code}>
                            <td
                              className="text-center"
                              style={{
                                width: '25%'
                              }}
                            >
                              {p.store_code}
                            </td>
                            <td className="text-center">
                              <img
                                width="72"
                                height="72"
                                src={p.image_url
                                  ? p.image_url
                                  : notFound}
                                alt="getsuperez@gmail.com"
                              />
                            </td>
                            <td className="text-center">
                              {p.store_name}
                            </td>
                            <td className="text-center">
                              {p.units}
                            </td>
                            <td className="text-center">
                              ${Number(p.unit_price).toFixed(2)}
                            </td>
                            <td className="text-center">
                                  ${Number(p.units * p.unit_price).toFixed(2)}
                            </td>
                          </tr>
                        )
                      ) : (
                        <tr>
                          <td className="text-center" colSpan="7">
                  No results found
                          </td>
                        </tr>
                      )
                  }
                </tbody>
                <tfoot>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><strong>Total</strong></td>
                    <td><strong>${Number(cartItems.length > 0 
                      ? cartItems.map(c => Number(c.units * c.unit_price)).reduce((x, y) => x + y) 
                      : 0).toFixed(2)}</strong></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div className="col-sm-6">
            {
              ezSmartCartItems.length > 0
                ? (
                  ezSmartCartItems.map((item, i) =>
                    <div key={i} className="card-body">
                      <h5>Additional options (StoreCommunity)</h5>
                      <table className="table table-responsive-sm table-hover table-outline 
            mb-0"
                      >
                        <thead className="thead-light">
                          <tr>
                            <th className="text-center">Store Code</th>
                            <th className="text-center">
                              <i className="icon-picture"></i>
                            </th>
                            <th className="text-center">Store Name</th>
                            <th className="text-center">Quantity</th>
                            <th className="text-center">Unit Price</th>
                            <th className="text-center">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            item.cart_items.length > 0
                              ? (
                                item.cart_items.map((p) =>
                                  <tr key={p.upc + p.store_code}>
                                    <td
                                      className="text-center"
                                      style={{
                                        width: '25%'
                                      }}
                                    >
                                      {p.store_code}
                                    </td>
                                    <td className="text-center">
                                      <img
                                        width="72"
                                        height="72"
                                        src={p.image_url
                                          ? p.image_url
                                          : notFound}
                                        alt="getsuperez@gmail.com"
                                      />
                                    </td>
                                    <td className="text-center">
                                      {p.store_name}
                                    </td>
                                    <td className="text-center">
                                      {p.units}
                                    </td>
                                    <td className="text-center">
                                  ${Number(p.unit_price).toFixed(2)}
                                    </td>
                                    <td className="text-center">
                                  ${Number(p.units * p.unit_price).toFixed(2)}
                                    </td>
                                  </tr>
                                )
                              ) : (
                                <tr>
                                  <td className="text-center" colSpan="7">
                      No results found
                                  </td>
                                </tr>
                              )
                          }
                        </tbody>
                        <tfoot>
                          <tr>
                            <td>
                              <button
                                type="button"
                                className="btn btn-square btn-outline-primary"
                                value={item.option_number}
                                onClick={() => this.handleChooseOptionClick(item.option_number)}
                              >
                                Choose option
                              </button>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><strong>Total</strong></td>
                            <td><strong>${Number(item.total || 0).toFixed(2)}</strong></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  )
                ) : (<div></div>)
            }
          </div>
        </div>
        <StoreCommunityCatalogCardBody />
      </div>
    );
  }
}

export default StoreCommunityCatalogCard;
