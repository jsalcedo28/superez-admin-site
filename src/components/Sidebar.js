import React from 'react';
import SidebarItems from './SidebarItems';

class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <nav className="sidebar-nav">
          <SidebarItems />
        </nav>
        <button className="sidebar-minimizer brand-minimizer" type="button" />
      </div>
    );
  }
}

export default Sidebar;
