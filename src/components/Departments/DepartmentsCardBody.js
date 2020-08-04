import React from 'react';
import DepartmentList from './DepartmentList';

class DepartmentsCardBody extends React.Component {
  render() {
    return (
      <div className="card-body">
        <DepartmentList />
      </div>
    );
  }
}

export default DepartmentsCardBody;
