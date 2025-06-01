import React from "react";
import Logo from "../assets/panda-logo.svg";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="nav-area">
      <div className="navbar">
        <div className="logo" />
        <div className="navbarPage">자유게시판</div>
        <div className="navbarPage">중고마켓</div>
      </div>
      <div>
        <button className="login-button">로그인</button>
      </div>
    </nav>
  );
}

export default Navbar;
