import React from 'react';
import { BrandListBodyListener } from '../../listeners/Brands/BrandListBodyListener';
import { BrandSearchListener } from '../../listeners/Brands/BrandSearchListener';

class BrandSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = { searchName: '' };

    this.handleSearchBrandsChange = 
      this.handleSearchBrandsChange.bind(this);

    BrandSearchListener.setSearchNameState =
      BrandSearchListener.setSearchNameState.bind(this);
  }

  handleSearchBrandsChange(event) {
    this.setState({ searchName: event.target.value });

    fetch('https://api.getsuperez.com/brands')
      .then((response) => response.json())
      .then((data) => {
        const searchName = this.state.searchName.replace(/[^a-zA-Z0-9]/g, '');

        const regexp = new RegExp(searchName, 'i');

        let brands = data.filter(p => regexp.test(p.name));

        if (brands.length === 0) {
          brands = data.filter(p => p.name.indexOf(searchName) > -1);
        }

        BrandListBodyListener.setBrandsState(brands);
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
          placeholder="Search brand(s) by name"
          aria-label="Input group example"
          aria-describedby="btnGroupAddon"
          value={searchName}
          onChange={this.handleSearchBrandsChange}
        />
      </div>
    );
  }
}

export default BrandSearch;
