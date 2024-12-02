import React from 'react';
import "./sidebar.css";
import SidebarButton from './sidebarButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp, faRss, faHeart, faMusic, faBook } from '@fortawesome/free-solid-svg-icons';
const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <img
        src="https://cdn.pixabay.com/photo/2016/10/22/00/15/spotify-1759471_1280.jpg"
        className="pp"
        alt="Profile Picture"
      />
      <div className="kk">
        <SidebarButton title="Feed" to="/feed" icon={<FontAwesomeIcon icon={faRss} />} />
        {/* <SidebarButton title="Player" to="/profile/${song.id}" icon={<FontAwesomeIcon icon={faMusic} />} /> */}
        <SidebarButton title="Add" to="/trending" icon={<FontAwesomeIcon icon={faArrowTrendUp} />} />
        <SidebarButton title="Fav" to="/favourites" icon={<FontAwesomeIcon icon={faHeart} />} />
        <SidebarButton title="Library" to="/" icon={<FontAwesomeIcon icon={faBook} />} />
      </div>
      {/* <SidebarButton title="Home" to="/feed" /> */}
    </div>
  );
};

export default Sidebar;
