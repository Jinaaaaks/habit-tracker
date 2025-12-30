import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="nav">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "navLink navLinkActive" : "navLink")}
      >
        Home
      </NavLink>

      <NavLink
        to="/add"
        className={({ isActive }) => (isActive ? "navLink navLinkActive" : "navLink")}
      >
        Add Habit
      </NavLink>

      <NavLink
        to="/stats"
        className={({ isActive }) => (isActive ? "navLink navLinkActive" : "navLink")}
      >
        Stats
      </NavLink>
    </div>
  );
}
