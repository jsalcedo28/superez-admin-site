import React from 'react';
import Sidebar from '../Sidebar';
import DepartmentContent from './DepartmentContent';

class DepartmentBody extends React.Component {
  render() {
    return (
      <div className="app-body">
        <Sidebar />
        <DepartmentContent />
      </div>
    );
  }
}

export default DepartmentBody;
