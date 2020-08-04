import React from 'react';
import DepartmentBreadcrumb from './DepartmentBreadcrumb';
import DepartmentsCard from './DepartmentsCard';
import DepartmentDetailModal from '../DepartmentDetail/DepartmentDetailModal';

class DepartmentContent extends React.Component {
  render() {
    return (
      <main className="main">
        <DepartmentBreadcrumb />
        <div className="container-fluid">
          <div className="animated fadeIn">
            <div className="row">
              <div className="col-md-12">
                <DepartmentsCard />
              </div>
            </div>
            <DepartmentDetailModal />
          </div>
        </div>
      </main>
    );
  }
}

export default DepartmentContent;
