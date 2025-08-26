import "./SideBar.css";
import avatar from "../../../assets/avatar.svg";

function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Default Avatar" />
      <p className="sidebar__username">Terrence Tegagne</p>
    </div>
  );
}

export default SideBar;
