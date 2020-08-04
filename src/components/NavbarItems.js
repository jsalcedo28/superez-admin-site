import React from 'react';
import OidcManager from '../helpers/oidc-utils';

class NavbarItems extends React.Component {
  render() {
    return (
      <ul className="nav navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <a
            id="username"
            style={{
              cursor: 'pointer',
              marginRight: '25px'
            }}
            className="nav-link"
            data-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <div className="dropdown-header text-center">
              <strong>Account</strong>
            </div>
            <a style={{ cursor: 'pointer' }} className="dropdown-item" onClick={() => OidcManager.logout()}>
              <i className="fa fa-lock" /> Logout
            </a>
          </div>
        </li>
      </ul>
    );
  }
}

export default NavbarItems;
