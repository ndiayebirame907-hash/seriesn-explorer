import { NavLink } from "react-router-dom";
import { useFavoris } from "../context/FavorisContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { favoris } = useFavoris();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-logo">
          <img src="/images/logo.png" alt="SerieSN Explorer" className="logo-img"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          <span className="logo-fallback" style={{display:"none"}}>
            <span className="logo-serie">Serie</span>
            <span className="logo-sn">SN</span>
            <span className="logo-explorer"> Explorer</span>
          </span>
        </NavLink>

        <div className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? "nav-link--active" : ""}`}>
            🏠 Accueil
          </NavLink>
          <NavLink to="/favoris" className={({ isActive }) => `nav-link ${isActive ? "nav-link--active" : ""}`}>
            ❤️ Favoris
            {favoris.length > 0 && <span className="badge-favoris">{favoris.length}</span>}
          </NavLink>
          <button className="theme-toggle" onClick={toggleTheme} title={theme === "light" ? "Mode sombre" : "Mode clair"}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </nav>
  );
}
