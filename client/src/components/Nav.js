import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  function navSlide() {
    const burgerClass = document.querySelector(".burger");
    const navList = document.querySelector(".nav-list");
    navList.classList.toggle("nav-active");
    const navLinks = document.querySelectorAll(".nav-item");
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkAnim 0.5s ease forwards ${
          index / 7 + 0.3
        }s`;
      }
      burgerClass.classList.toggle("toggle");
    });
  }
  return (
    <nav className="nav-bar">
      <h1 className="brand">LWL</h1>
      <ul className="nav-list">
        <Link className="nav-item" to="/">
          Home
        </Link>
        <Link className="nav-item" to="/login">
          Login
        </Link>
        <Link className="nav-item" to="/about">
          About
        </Link>
        <Link className="nav-item" to="/contact">
          Contact
        </Link>
      </ul>
      <div className="burger" onClick={navSlide}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default Nav;
