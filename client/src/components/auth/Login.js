import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import { Redirect, Link } from "react-router-dom";
import Alert from "../layout/Alert";

function Login({ login, isAuthenticated, theme }) {
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
    <div className={theme}>
      <main className="hundred-perc">
        <section className="container login-container flexy height-mod">
          <div className="login-cols1">
            <h1 className="title large text-primary">Login</h1>
            <p className="lead">
              <i className="fas fa-user"> Sign into your Account</i>
            </p>

            <Alert />
            <form className="form" onSubmit={(e) => onSubmit(e)}>
              <h1 className="text-primary">{name && `Hello ${name}`}</h1>
              <div className="form-group">
                <label htmlFor="urnme" name="username" className="form-label">
                  Email ID:
                  <input
                    type="email"
                    id="urnme"
                    name="email"
                    value={email}
                    className="form-input"
                    placeholder="Email Address"
                    autoComplete="Off"
                    onChange={(e) => handleUserNameChange(e)}
                    required
                  />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="pwd" name="password" className="login-label">
                  Password:
                  <input
                    type="password"
                    id="pwd"
                    name="password"
                    value={password}
                    className="form-input"
                    placeholder="Password"
                    autoComplete="Off"
                    onChange={(e) => handlePasswordChange(e)}
                  />
                </label>
              </div>
              <div>
                <input
                  type="submit"
                  name="login"
                  className="btn btn-primary form-input pad-half"
                  value="Log In "
                />
              </div>
            </form>
            <p className="my-1">
              Don't have an Account?
              <Link to="/login" className="btn btn-dark mx-1">
                Register
              </Link>
            </p>
          </div>
          <div className="login-cols2">
            <p className="lead">
              <i className="fa fa-refresh text-primary">
                <strong> Alternate Options</strong>
              </i>
            </p>
            <form className="form">
              <div className="form-group">
                <button type="submit" className="btn btn-google">
                  <div className="p-1 fo-1">
                    <i className="fab fa-google"></i>
                    <strong> Login With Google</strong>
                  </div>
                </button>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-facebook">
                  <div className="padx-half-pady-one fo-1">
                    <i className="fab fa-facebook"></i>
                    <strong> Login With Facebook</strong>
                  </div>
                </button>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-github">
                  <div className="p-1 fo-1">
                    <i className="fab fa-github"></i>
                    <strong> Login With Github</strong>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <div className="circle1"></div>
      <div className="circle2"></div>
    </div>
  );
}

login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  theme: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  theme: state.theme.theme,
});

export default connect(mapStateToProps, { login })(Login);
