import { Link, useLocation } from "react-router-dom";

import {
  FaBicycle,
  FaClipboardList,
  FaTags,
} from "react-icons/fa";

function Menu() {
  const location = useLocation();

  return (
    <header className="topbar">
      <div className="logo-area">
        <div className="logo-icon">
          <FaBicycle />
        </div>

        <div>
          <h1>BikeRent</h1>
          <span>Management System</span>
        </div>
      </div>

      <nav>
        <Link
          to="/alugueis"
          className={
            location.pathname === "/alugueis"
              ? "active"
              : ""
          }
        >
          <FaClipboardList />
          Aluguéis
        </Link>

        <Link
          to="/planos"
          className={
            location.pathname === "/planos"
              ? "active"
              : ""
          }
        >
          <FaTags />
          Planos
        </Link>
      </nav>
    </header>
  );
}

export default Menu;