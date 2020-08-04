import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './containers/App';
import OidcManager from './helpers/oidc-utils';

OidcManager.getUser(callback => {
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
    , document.getElementById('root'));

  registerServiceWorker();

  callback();
});
