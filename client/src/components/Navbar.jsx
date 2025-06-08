import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="nav-area">
      <div className="navbar">
        <Link to="/" className="logo" />
        <NavLink to="/board" className="navbarPage">
          자유게시판
        </NavLink>
        <NavLink to="/items" className="navbarPage">
          중고마켓
        </NavLink>
      </div>
      <div>
        <button className="login-button">로그인</button>
      </div>
    </nav>
  );
}

export default Navbar;
