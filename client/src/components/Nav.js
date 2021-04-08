import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";
import { setTheme } from "../actions/theme";

function Nav({ logout, auth: { isAuthenticated, loading }, theme, setTheme }) {
  const [mode, setMode] = useState("false");
  const authLinks = (
    <ul>
      <li>
        <Link className="nav-item" to="/dashboard">
          DashBoard
        </Link>
      </li>
      <li>
        <Link className="nav-item" to="/login" onClick={logout}>
          Logout
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul className="nav-list">
      <li>
        <Link className="nav-item" to="/">
          Home
        </Link>
      </li>
      <li>
        <Link className="nav-item" to="/dashboard">
          Dashboard
        </Link>
      </li>
      <li>
        <Link className="nav-item" to="/signup">
          Signup
        </Link>
      </li>
      <li>
        <Link className="nav-item" to="/login">
          Login
        </Link>
      </li>
    </ul>
  );
  // function navSlide() {
  //   const burgerClass = document.querySelector(".burger");
  //   const navList = document.querySelector(".nav-list");
  //   navList.classList.toggle("nav-active");
  //   const navLinks = document.querySelectorAll(".nav-item");
  //   navLinks.forEach((link, index) => {
  //     if (link.style.animation) {
  //       link.style.animation = "";
  //     } else {
  //       link.style.animation = `navLinkAnim 0.5s ease forwards ${
  //         index / 7 + 0.3
  //       }s`;
  //     }
  //     burgerClass.classList.toggle("toggle");
  //   });
  // }
  function handleCheck() {
    setMode(!mode);
    setTheme(mode);
  }
  return (
    <div className={theme}>
      <nav className="navbar">
        <h1 className="brand">
          <Link to="/" className="nav-item">
            <i className="fas fa-certificate"></i> CodeCertify
          </Link>
        </h1>
        <ul className="nav-list">
          <li className="slider">
            <strong>Light</strong>
            <input
              type="checkbox"
              id="switch"
              className="checkbox"
              onChange={handleCheck}
            />
            <label htmlFor="switch" className="toggle"></label>
            <strong>Dark</strong>
          </li>
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </ul>
        {/* <div className="burger" onClick={navSlide}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div> */}
      </nav>
    </div>
  );
}

Nav.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  theme: state.theme.theme,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => logout(),
  setTheme: (mode) => dispatch(setTheme(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
