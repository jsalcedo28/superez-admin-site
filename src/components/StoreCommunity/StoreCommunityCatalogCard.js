import React from 'react';
import StoreCommunityListBody from './StoreCommunityListBody';

class StoreCommunityCatalogCard extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-header">
          <h2>Reviews</h2>
        </div>
        <div className="card-body">
          <StoreCommunityListBody />
        </div>
      </div>
    );
  }
}

export default StoreCommunityCatalogCard;
