import React, { useState } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import Alert from "../layout/Alert";
import { Redirect, Link } from "react-router-dom";

function Signup({ setAlert, register, isAuthenticated }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const { email, password, password2 } = formData;

  //*Updating the corresponding State of the Fields , when they are changed. ...formData spreads the object and we are updating which ever field that was changed by user.
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords Do Not Match", "danger");
    } else {
      register({ email, password });
    }
  };

  //* Redirect If Authenticated

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    //* <Provider store={store}>
    <>
      <main className="flexy m-1">
        <section className="container login-container flexy w-75">
          <div className="login-cols1">
            <h1 className="title large text-primary pt-1">Sign Up</h1>
            <p className="lead">
              <i className="fas fa-user"> Create Your Account</i>
            </p>

            <Alert width="100" />
            <form className="form" onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <label htmlFor="urnme" name="username" className="form-label">
                  Email ID<sup>*</sup>
                  <input
                    type="email"
                    id="urnme"
                    name="email"
                    value={email}
                    className="form-input"
                    placeholder="Email Address"
                    autoComplete="Off"
                    onChange={(e) => onChange(e)}
                    required
                  />
                  <small className="form-text">
                    *This site uses Gravatar linked with your Email
                  </small>
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
                    onChange={(e) => onChange(e)}
                  />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="pwd2" name="password" className="login-label">
                  Confirm Password:
                  <input
                    type="password"
                    id="pwd2"
                    name="password2"
                    value={password2}
                    className="form-input"
                    placeholder="Confirm Password"
                    autoComplete="Off"
                    onChange={(e) => onChange(e)}
                  />
                </label>
              </div>
              <div>
                <input
                  type="submit"
                  name="login"
                  className="btn btn-primary form-input mt-2"
                  value="Sign Me Up"
                />
              </div>
            </form>
            <p className="my-1">
              Already have an Account?
              <Link to="/login" className="btn btn-dark mx-1">
                Login
              </Link>
            </p>
          </div>
          <div className="login-cols2">
            <p className="lead size-sm">
              <i className="fa fa-refresh text-dark">
                <strong> Alternate Options</strong>
              </i>
            </p>
              <div className="my-05">
                <Link type="submit" className="btn btn-google">
                  <div className="p-1 fo-1">
                    <i className="fab fa-google"></i>
                    <strong> Sign Up With Google</strong>
                  </div>
                </Link>
              </div>
              <div className="my-05">
                <button type="submit" className="btn btn-facebook">
                  <div className="padx-half-pady-one fo-1">
                    <i className="fab fa-facebook"></i>
                    <strong> Sign Up With Facebook</strong>
                  </div>
                </button>
              </div>
              <div className="my-05">
                <button type="submit" className="btn btn-github">
                  <div className="p-1 fo-1">
                    <i className="fab fa-github"></i>
                    <strong> Sign Up With Github</strong>
                  </div>
                </button>
              </div>
          </div>
        </section>
      </main>
      <div className="circle1"></div>
      <div className="circle2"></div>
    </>
    // </Provider>
  );
}

Signup.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Signup); //!Syntax : connect(State,{actions})
