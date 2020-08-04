import React from 'react';
import { DepartmentListBodyListener } from '../../listeners/Departments/DepartmentListBodyListener';
import { DepartmentSearchListener } from '../../listeners/Departments/DepartmentSearchListener';

class DepartmentSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = { searchName: '' };

    this.handleSearchDepartmentsChange = 
      this.handleSearchDepartmentsChange.bind(this);

    DepartmentSearchListener.setSearchNameState =
      DepartmentSearchListener.setSearchNameState.bind(this);
  }

  handleSearchDepartmentsChange(event) {
    this.setState({ searchName: event.target.value });

    fetch('https://api.getsuperez.com/departments')
      .then((response) => response.json())
      .then((data) => {
        const searchName = this.state.searchName.replace(/[^a-zA-Z0-9]/g, '');

        const regexp = new RegExp(searchName, 'i');

        let departments = data.filter(p => regexp.test(p.name));

        if (departments.length === 0) {
          departments = data.filter(p => p.name.indexOf(searchName) > -1);
        }

        DepartmentListBodyListener.setDepartmentsState(departments);
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
          placeholder="Search department(s) by name"
          aria-label="Input group example"
          aria-describedby="btnGroupAddon"
          value={searchName}
          onChange={this.handleSearchDepartmentsChange}
        />
      </div>
    );
  }
}

export default DepartmentSearch;
