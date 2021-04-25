import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";
import Alert from "../layout/Alert";

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false); //* To disable "to" date when current is checked.

  const { title, company, location, from, to, current, description } = formData;
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addExperience(formData, history);
    window.scrollTo(0, 0);
  };
  return (
    <Fragment>
      <div className="hundred-perc pages">
        <h1 className="large nav-margin text-primary pt-1">Add Experience</h1>
        <p className="lead">
          <i className="fas fa-user-tie"></i> Add your career experience here.
        </p>
        <small>* - Mandatory Fields</small>
        <Alert />
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group createprofile">
            <input
              name="title"
              type="text"
              placeholder="* Job Title"
              value={title}
              onChange={(e) => handleFormChange(e)}
            />
          </div>
          <div className="form-group createprofile">
            <input
              name="company"
              type="text"
              placeholder="* Company"
              value={company}
              onChange={(e) => handleFormChange(e)}
            />
          </div>
          <div className="form-group createprofile">
            <input
              name="location"
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => handleFormChange(e)}
            />
          </div>
          <div className="form-group createprofile">
            <h4>From Date</h4>
            <input
              name="from"
              type="date"
              value={from}
              onChange={(e) => handleFormChange(e)}
            />

            <div className="form-group createprofile">
              <p>
                <input
                  type="checkbox"
                  name="current"
                  value={current}
                  checked={current}
                  onChange={(e) => {
                    setFormData({ ...formData, current: !current });
                    toggleDisabled(!toDateDisabled);
                  }}
                />{" "}
                {/* Placing the space here since "Current Job Won't show up in JSX" */}
                Current Job
              </p>
            </div>
            <div className="form-group createprofile">
              <h4>To Date</h4>
              <input
                disabled={toDateDisabled ? "disabled" : ""}
                name="to"
                type="date"
                value={to}
                onChange={(e) => handleFormChange(e)}
              />
            </div>
            <div className="form-group createprofile">
              <textarea
                onChange={(e) => handleFormChange(e)}
                cols="30"
                rows="5"
                placeholder="Job Description"
                value={description}
                name="description"
              ></textarea>
            </div>
            <input type="submit" className="btn btn-primary my-1" />
            <Link to="/dashboard" className="btn btn-dark m-1">
              <i className="fas fa-backward"></i> Go Back
            </Link>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
