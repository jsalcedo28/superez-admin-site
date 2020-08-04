import React from 'react';
import Sidebar from '../Sidebar';
import StoreCommunityContent from './StoreCommunityContent';

class StoreCommunityBody extends React.Component {
  render() {
    return (
      <div className="app-body">
        <Sidebar />
        <StoreCommunityContent />
      </div>
    );
  }
}

export default StoreCommunityBody;
