import React, { useState } from "react";
import { connect } from "react-redux"; //To connect the component to Redux. Whenever we use connect we also need to export the connect.
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import Alert from "../layout/Alert";
import { Provider } from "react-redux";
import store from "../../store";
import { Redirect } from "react-router-dom";

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
      setAlert("Passwords DO NOT Match", "danger");
    } else {
      register({ email, password });
    }
  };

  //* Redirect If Authenticated

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Provider store={store}>
      <div className="login-page">
        <div className="login-parent">
          <div className="login-cols1">
            <div className="login-title">
              <h1 className="title">Sign Up</h1>
            </div>
            <Alert />
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
                      onChange={(e) => onChange(e)}
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
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </label>
              </div>
              <div className="login-label2">
                <label htmlFor="pwd2" name="password" className="login-label">
                  Confirm Password:
                  <div>
                    <input
                      type="password"
                      id="pwd2"
                      name="password2"
                      value={password2}
                      className="login-inputs"
                      placeholder="Enter Your Password"
                      autoComplete="Off"
                      onChange={(e) => onChange(e)}
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
                  <strong>Sign Me Up!</strong>
                </button>
              </div>
            </form>
          </div>
          <div className="login-cols2">
            <div className="login-title">
              <h1 className="title">Alternate Options</h1>
            </div>
            <div className="alt-buttons">
              <button className="btn-google">Sign Up with Google</button>
            </div>
            <div className="alt-buttons">
              <button className="btn-facebook">Sign Up with Facebook</button>
            </div>
            <div className="alt-buttons">
              <button className="btn-github">Sign Up with Github</button>
            </div>
          </div>
        </div>
      </div>
      <div className="circle1"></div>
      <div className="circle2"></div>
    </Provider>
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
