import "./SideBar.css";

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import avatar from "../../../assets/avatar.svg";

function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();
  useEffect(() => {
    console.debug("SideBar mounted. currentUser:", currentUser);
  }, [currentUser]);
  const handleSignOutClick = () => {
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
      <div className="sidebar__top">
        {renderAvatar()}
        <p className="sidebar__username">
          {currentUser ? currentUser.name : "User"}
        </p>
      </div>

      <div className="sidebar__buttons">
        <button className="sidebar__edit-btn" onClick={onEditProfile}>
          Change profile data
        </button>
        <button className="sidebar__signout-btn" onClick={handleSignOutClick}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
