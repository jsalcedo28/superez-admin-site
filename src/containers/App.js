import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import appRoutes from '../routes/app';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Switch>
          {
            appRoutes.map((prop, key) => {
              if (prop.path === '/'
                || prop.path.match(/\//gi).length === 1) {
                return (
                  <Route
                    exact path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                );
              } else {
                return (
                  <Route
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                );
              }
            })
          }
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
