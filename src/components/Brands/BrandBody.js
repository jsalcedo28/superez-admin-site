import React from 'react';
import Sidebar from '../Sidebar';
import BrandContent from './BrandContent';

class BrandBody extends React.Component {
  render() {
    return (
      <div className="app-body">
        <Sidebar />
        <BrandContent />
      </div>
    );
  }
}

export default BrandBody;
