import React from 'react';

class BrandListHead extends React.Component {
  render() {
    return (
      <thead className="thead-light">
        <tr>
          <th className="text-center">No</th>
          <th className="text-center">
            <i className="icon-picture"></i>
          </th>
          <th className="text-center">Name</th>
          <th className="text-center">Description</th>
          <th className="text-center">Action</th>
        </tr>
      </thead>
    );
  }
}

export default BrandListHead;
