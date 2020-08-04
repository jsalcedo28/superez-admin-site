import React from 'react';
import BrandListHead from './BrandListHead';
import BrandListBody from './BrandListBody';

class BrandList extends React.Component {
  render() {
    return (
      <table className="table table-responsive-sm table-hover table-outline 
        mb-0"
      >
        <BrandListHead />
        <BrandListBody />
      </table>
    );
  }
}

export default BrandList;
