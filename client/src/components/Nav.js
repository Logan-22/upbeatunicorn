import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";
import { setTheme } from "../actions/theme";

function Nav({ logout, auth: { isAuthenticated, loading }, setTheme }) {
  const [mode, setMode] = useState(localStorage.getItem("darkmode") === "true");

  const authLinks = (
    <ul>
      <li>
        <Link className="nav-item" to="/dashboard">
          <i className="fas fa-chalkboard"></i>
          <span className="hide-sm"> Dashboard</span>
        </Link>
      </li>
      <li>
        <Link className="nav-item" to="/profiles">
          <i className="fas fa-users"></i>
          <span className="hide-sm"> Profiles</span>
        </Link>
      </li>
      <li>
        <Link className="nav-item" to="/posts">
          <i className="fas fa-laptop-code"></i>
          <span className="hide-sm"> Posts</span>
        </Link>
      </li>
      <li>
        <Link className="nav-item" to="/login" onClick={logout}>
          <i className="fas fa-sign-out-alt"></i>
          <span className="hide-sm"> Logout</span>
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul className="nav-list">
      <li>
        <Link className="nav-item" to="/">
          <i className="fas fa-home"></i>
          <span className="hide-sm"> Home</span>
        </Link>
      </li>
      <li>
        <Link className="nav-item" to="/dashboard">
          <i className="fas fa-chalkboard"></i>
          <span className="hide-sm"> Dashboard</span>
        </Link>
      </li>
      <li>
        <Link className="nav-item" to="/profiles">
          <i className="fas fa-users"></i>
          <span className="hide-sm"> Profiles</span>
        </Link>
      </li>
      <li>
        <Link className="nav-item" to="/signup">
          <i className="fas fa-user-plus"></i>
          <span className="hide-sm"> Signup</span>
        </Link>
      </li>
      <li>
        <Link className="nav-item" to="/login">
          <i className="fas fa-sign-in-alt"></i>
          <span className="hide-sm"> Login</span>
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
    setTheme(!mode);
    setMode(!mode);
  }

  return (
    <div className="mob-nav">
      <nav className="navbar">
        <h1 className="brand">
          <Link to="/" className="nav-item">
            <i className="fas fa-certificate"></i> CodeCertify
          </Link>
        </h1>
        <ul className="nav-list">
          <li className="slider">
            <strong>
              <i className="fas fa-sun"></i>{" "}
              <span className="hide-sm">Light</span>
            </strong>
            <input
              type="checkbox"
              id="dynamicCheck"
              className="checkbox"
              onChange={handleCheck}
            />
            <label htmlFor="dynamicCheck" className="toggle"></label>
            <strong className="drk">
              <i className="fas fa-moon"></i>{" "}
              <span className="hide-sm">Dark</span>
            </strong>
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
  setTheme: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

// const mapDispatchToProps = (dispatch) => ({
//   logout: () => dispatch(logout()),
//   setTheme: (mode) => dispatch(setTheme(mode)),
// });

export default connect(mapStateToProps, {
  logout,
  setTheme: (mode) => setTheme(mode),
})(Nav);
