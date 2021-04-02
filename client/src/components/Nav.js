import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";

function Nav({ logout, auth: { isAuthenticated, loading } }) {
  const authLinks = (
    <ul className="nav-list">
      <Link onClick={logout} className="nav-item" to="/login">
        Logout
      </Link>
    </ul>
  );
  const guestLinks = (
    <ul className="nav-list">
      <Link className="nav-item" to="/">
        Home
      </Link>
      <Link className="nav-item" to="/dashboard">
        Dashboard
      </Link>
      <Link className="nav-item" to="/signup">
        Signup
      </Link>
      <Link className="nav-item" to="/login">
        Login
      </Link>
    </ul>
  );
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
      <h1 className="brand">CodeCertify</h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
      <div className="burger" onClick={navSlide}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

Nav.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Nav);
