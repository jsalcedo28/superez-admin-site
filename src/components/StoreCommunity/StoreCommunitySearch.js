import React from 'react';
import { StoreCommunityListBodyListener } from '../../listeners/StoreCommunity/StoreCommunityListBodyListener';
import { StoreCommunitySearchListener } from '../../listeners/StoreCommunity/StoreCommunitySearchListener';

class StoreCommunitySearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = { searchName: '' };

    this.handleSearchStoreCommunityChange = 
      this.handleSearchStoreCommunityChange.bind(this);

    StoreCommunitySearchListener.setSearchNameState =
      StoreCommunitySearchListener.setSearchNameState.bind(this);
  }

  handleSearchStoreCommunityChange(event) {
    this.setState({ searchName: event.target.value });

    fetch('https://api.getsuperez.com/stores')
      .then((response) => response.json())
      .then((data) => {
        const searchName = this.state.searchName.replace(/[^a-zA-Z0-9]/g, '');

        const regexp = new RegExp(searchName, 'i');

        let stores = data.filter(p => regexp.test(p.store_name));

        if (stores.length === 0) {
          stores = data.filter(p => p.upc.indexOf(searchName) > -1);
        }

        StoreCommunityListBodyListener.setStoresState(stores);
      });
  }

  render() {
    const { searchName } = this.state;

    return (
      <div className="input-group ml-3">
        <div className="input-group-prepend">
          <span
            className="input-group-text bg-primary btn-square border 
              border-primary"
            id="btnGroupAddon"
          >
            <i className="icon-magnifier" />
          </span>
        </div>
        <input
          type="text"
          className="form-control btn-square border border-primary"
          placeholder="Search store(s)..."
          aria-label="Input group example"
          aria-describedby="btnGroupAddon"
          value={searchName}
          onChange={this.handleSearchStoreCommunityChange}
        />
      </div>
    );
  }
}

export default StoreCommunitySearch;
