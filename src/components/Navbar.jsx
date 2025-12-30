import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  padding: "10px 12px",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
  background: isActive ? "#111" : "#eee",
  color: isActive ? "white" : "#111",
});

export default function Navbar() {
  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
      <NavLink to="/" style={linkStyle}>
        Home
      </NavLink>
      <NavLink to="/add" style={linkStyle}>
        Add Habit
      </NavLink>
      <NavLink to="/stats" style={linkStyle}>
        Stats
      </NavLink>
    </div>
  );
}
