import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";
import { setTheme } from "../actions/theme";

function Nav({ logout, auth: { isAuthenticated, loading }, setTheme }) {
  const [mode, setMode] = useState(localStorage.getItem("darkmode") === "true");
  // const [color, setColor] = useState("");

  useEffect(() => {
    setTheme(mode);
  }, [mode, setTheme]);

  const authLinks = (
    <ul className="nav-list">
      <li>
        <Link className="nav-item" to="/posts">
          <i className="fas fa-chalkboard"></i>
          <span className="hide-sm"> Dashboard</span>
        </Link>
      </li>
      <li>
        <Link className="nav-item" to="/profiles">
          <i className="fas fa-users"></i>
          <span className="hide-sm"> Contributors</span>
        </Link>
      </li>
      <li>
        <Link className="nav-item" to="/add-post">
          <i className="fas fa-laptop-code"></i>
          <span className="hide-sm"> Content</span>
        </Link>
      </li>
      <li>
        <Link className="nav-item" to="/dashboard">
          <i className="fas fa-laptop-code"></i>
          <span className="hide-sm"> Placeholder</span>
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
          <span className="hide-sm"> Contributors</span>
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
  return (
      <nav className="navbar p-05">
          <Link to="/" className="brand">
            <i className="fas fa-certificate hide-sm"></i> <strong> CodeCertify</strong>
          </Link>
        <div className="space"></div>
          <span className="slider">
            <strong>
              <i className="fas fa-sun"></i>{" "}
              <span className="hide-sm">Light</span>
            </strong>
            <input
              type="checkbox"
              id="dynamicCheck"
              className="checkbox"
              onChange={() => setMode(!mode)}
            />
            <label htmlFor="dynamicCheck" className="toggle"></label>
            <strong className="drk">
              <i className="fas fa-moon"></i>{" "}
              <span className="hide-sm">Dark</span>
            </strong>
          </span>
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
      </nav>
  );
}

Nav.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  setTheme: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

// const mapDispatchToProps = (dispatch) => ({
//   logout: () => dispatch(logout()),
//   setTheme: (mode) => dispatch(setTheme(mode)),
// });

export default connect(mapStateToProps, {
  logout,
  setTheme: (mode) => setTheme(mode)
})(Nav);
