import React from 'react';

class ProductListHead extends React.Component {
  render() {
    return (
      <thead className="thead-light">
        <tr>
          <th className="text-center">No</th>
          <th className="text-center">Store Code</th>
          <th className="text-center">Department Code</th>
          <th className="text-center">Category Code</th>
          <th className="text-center">
            <i className="icon-picture"></i>
          </th>
          <th className="text-center">UPC Number</th>
          <th className="text-center">Product Name</th>
          <th className="text-center">Status</th>
          <th className="text-center">Action</th>
        </tr>
      </thead>
    );
  }
}

export default ProductListHead;
