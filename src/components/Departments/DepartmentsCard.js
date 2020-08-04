import React from 'react';
import DepartmentSearch from './DepartmentSearch';
import DepartmentsCardBody from './DepartmentsCardBody';

class DepartmentsCard extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-header">
          <h2>Departments</h2>
        </div>
        <div className="col-sm-12" />
        <div className="row mt-4">
          <div className="col-sm-10">
            <DepartmentSearch />
          </div>
        </div>
        <DepartmentsCardBody />
      </div>
    );
  }
}

export default DepartmentsCard;
