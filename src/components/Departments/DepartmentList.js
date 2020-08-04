import React from 'react';
import DepartmentListHead from './DepartmentListHead';
import DepartmentListBody from './DepartmentListBody';

class DepartmentList extends React.Component {
  render() {
    return (
      <table className="table table-responsive-sm table-hover table-outline 
        mb-0"
      >
        <DepartmentListHead />
        <DepartmentListBody />
      </table>
    );
  }
}

export default DepartmentList;
