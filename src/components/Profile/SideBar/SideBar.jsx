import "./SideBar.css";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import avatar from "../../../assets/avatar.svg";

function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const handleSignOutClick = () => {
    // clear auth state in parent, then navigate to main page
    if (onSignOut) onSignOut();
    navigate("/", { replace: true });
  };
  const renderAvatar = () => {
    if (currentUser && currentUser.avatar) {
      return (
        <img
          className="sidebar__avatar"
          src={currentUser.avatar}
          alt={currentUser.name}
        />
      );
    } else if (currentUser && currentUser.name) {
      return (
        <div className="sidebar__avatar sidebar__avatar_placeholder">
          {currentUser.name.charAt(0).toUpperCase()}
        </div>
      );
    } else {
      return (
        <img className="sidebar__avatar" src={avatar} alt="Default Avatar" />
      );
    }
  };
  return (
    <div className="sidebar">
      {renderAvatar()}
      <p className="sidebar__username">
        {currentUser ? currentUser.name : "User"}
      </p>
      <button className="sidebar__edit-btn" onClick={onEditProfile}>
        Edit profile
      </button>
      <button className="sidebar__signout-btn" onClick={handleSignOutClick}>
        Sign out
      </button>
    </div>
  );
}

export default SideBar;
