import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";
import Alert from "../layout/Alert";

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    fieldOfStudy: "",
    school: "",
    degree: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false); //* To disable "to" date when current is checked.

  const {
    fieldOfStudy,
    school,
    degree,
    from,
    to,
    current,
    description,
  } = formData;
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addEducation(formData, history);
    window.scrollTo(0, 0);
  };
  return (
    <Fragment>
      <div className="hundred-perc pages">
        <h1 className="large nav-margin text-primary">Add Education</h1>
        <p className="lead">
          <i class="fas fa-user-graduate"></i> Add your education here.
        </p>
        <small>* - Mandatory Fields</small>
        <Alert />
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group createprofile">
            <input
              name="school"
              type="text"
              placeholder="* School/College"
              value={school}
              onChange={(e) => handleFormChange(e)}
            />
          </div>
          <div className="form-group createprofile">
            <input
              name="degree"
              type="text"
              placeholder="* Degree or Certificate"
              value={degree}
              onChange={(e) => handleFormChange(e)}
            />
          </div>
          <div className="form-group createprofile">
            <input
              name="fieldOfStudy"
              type="text"
              placeholder="* Field Of Study"
              value={fieldOfStudy}
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
                Current School
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
                placeholder="Program Description"
                value={description}
                name="description"
              ></textarea>
            </div>
            <input type="submit" className="btn btn-primary my-1" />
            <Link to="/dashboard" className="btn btn-dark m-1">
              <i class="fas fa-backward"></i> Go Back
            </Link>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));
