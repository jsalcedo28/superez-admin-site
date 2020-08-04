import React from 'react';
import StoreCommunityBreadcrumb from './StoreCommunityBreadcrumb';
import StoreCommunityCatalogCard from './StoreCommunityCatalogCard';

class StoreCommunityContent extends React.Component {
  render() {
    return (
      <main className="main">
        <StoreCommunityBreadcrumb />
        <div className="container-fluid">
          <div className="animated fadeIn">
            <div className="row">
              <div className="col-md-12">
                <StoreCommunityCatalogCard />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default StoreCommunityContent;
