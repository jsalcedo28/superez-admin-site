import React from 'react';

class StoreBreadcrumb extends React.Component {
  render() {
    return (
      <ol className="breadcrumb">
        <li className="breadcrumb-item">Home</li>
        <li className="breadcrumb-item">
          <a href="/stores">Stores</a>
        </li>
        <li className="breadcrumb-item">{this.props.storeId}</li>
      </ol>
    );
  }
}

export default StoreBreadcrumb;
