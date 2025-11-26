import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <Link className="brand" to="/">
          UserManagement
        </Link>

        <div>
          <Link to="/">Home</Link>
          <Link to="/create" className="btn small">
            Create
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
