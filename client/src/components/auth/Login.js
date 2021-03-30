import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import { Redirect } from "react-router-dom";

function Login({ login, isAuthenticated }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [name, setName] = useState("");

  const { email, password } = formData;

  //*Updating the corresponding State of the Fields , when they are changed. ...formData spreads the object and we are updating which ever field that was changed by user.
  const handleUserNameChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const justName = e.target.value.split("@");
    setName(justName[0]);
  };
  const handlePasswordChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  //*Redirect if Logged in

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div className="login-page">
        <div className="login-parent">
          <div className="login-cols1">
            <div className="login-title">
              <h1 className="title">Login</h1>
            </div>
            {name.length > 0 && <h2 className="login-name">Hello {name}</h2>}
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="login-label1">
                <label htmlFor="urnme" name="username" className="login-label">
                  Email ID:
                  <div>
                    <input
                      type="email"
                      id="urnme"
                      name="email"
                      value={email}
                      className="login-inputs"
                      placeholder="Enter Your Email Address"
                      autoComplete="Off"
                      onChange={handleUserNameChange}
                      required
                    />
                  </div>
                </label>
              </div>
              <div className="login-label2">
                <label htmlFor="pwd" name="password" className="login-label">
                  Password:
                  <div>
                    <input
                      type="password"
                      id="pwd"
                      name="password"
                      value={password}
                      className="login-inputs"
                      placeholder="Enter Your Password"
                      autoComplete="Off"
                      onChange={handlePasswordChange}
                    />
                  </div>
                </label>
              </div>
              <div>
                <button
                  type="submit"
                  name="login"
                  className="login-button"
                  value="Login"
                >
                  <strong>Login</strong>
                </button>
              </div>
            </form>
          </div>
          <div className="login-cols2">
            <div className="login-title">
              <h1 className="title">Alternate Options</h1>
            </div>
            <div className="alt-buttons">
              <button className="btn-google">Sign in with Google</button>
            </div>
            <div className="alt-buttons">
              <button className="btn-facebook">Sign in with Facebook</button>
            </div>
            <div className="alt-buttons">
              <button className="btn-github">Sign in with Github</button>
            </div>
          </div>
        </div>
      </div>
      <div className="circle1"></div>
      <div className="circle2"></div>
    </Fragment>
  );
}

login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
