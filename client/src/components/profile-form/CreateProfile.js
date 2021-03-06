import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";
import { withRouter, Link } from "react-router-dom"; //* The history object in the createprofile action , requires "withRouter"
import Alert from "../layout/Alert";

const CreateProfile = ({ createProfile, history }) => {
  const [displaySocial, setDisplaySocial] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    status: "",
    skills: "",
    bio: "",
    githubusername: "",
    twitter: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
  });

  const {
    name,
    company,
    status,
    skills,
    bio,
    githubusername,
    twitter,
    facebook,
    instagram,
    linkedin,
    youtube,
  } = formData;

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, false);
    window.scrollTo(0, 0);
  };

  return (
    <Fragment>
      <div className="hundred-perc pages">
        <h1 className="large nav-margin text-primary pt-1">
          Create Your Profile
        </h1>
        <p className="lead">
          <i className="fas fa-user"></i> Please Provide your details to create
          profile
        </p>
        <small>* - Mandatory Fields</small>
        <Alert />
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group createprofile w-75">
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => handleFormChange(e)}
            />
            <small className="form-text">What are you called?</small>
          </div>
          <div className="form-group createprofile w-75">
            <input
              name="company"
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) => handleFormChange(e)}
            />
            <small className="form-text">Name of Your Organization</small>
          </div>
          <div className="form-group createprofile w-75">
            <select
              name="status"
              value={status}
              onChange={(e) => handleFormChange(e)}
            >
              <option value="0">* Select Professional Status</option>
              <option value="Developer">Developer</option>
              <option value="Junior Developer">Junior Developer</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Manager">Manager</option>
              <option value="Student">Student</option>
              <option value="Instructor">Instructor</option>
              <option value="Intern">Intern</option>
              <option value="Others">Others</option>
            </select>
            <small className="form-text">
              Let us where you stand on your career
            </small>
          </div>
          <div className="form-group createprofile w-75">
            <input
              name="skills"
              type="text"
              placeholder="* Skills"
              value={skills}
              onChange={(e) => handleFormChange(e)}
            />
            <small className="form-text">
              Please use comma seperated values (eg. HTML,CSS, JS)
            </small>
          </div>
          <div className="form-group createprofile w-75">
            <input
              name="githubusername"
              type="text"
              placeholder="Github Username"
              value={githubusername}
              onChange={(e) => handleFormChange(e)}
            />
            <small className="form-text">
              This site can display your Github Repos in your profile , if you
              provide your github username
            </small>
            <div className="form-group createprofile">
              <textarea
                name="bio"
                placeholder="A short bio of yourself"
                value={bio}
                onChange={(e) => handleFormChange(e)}
                maxLength="200"
              />
              <small className="form-text">
                Tell us a little about yourself
              </small>
            </div>
            <div className="my-2">
              <button
                onClick={() => setDisplaySocial(!displaySocial)}
                type="button"
                className="btn btn-success"
              >
                {displaySocial ? "Hide" : "Add"} social media links
              </button>
              <span className="fsize-half">
                {displaySocial ? null : "Optional"}
              </span>
            </div>
            {displaySocial && (
              <Fragment>
                <div className="form-group createprofile social-link w-75">
                  <i className="fab fa-twitter fa-2x text-twitter"></i>
                  <input
                    name="twitter"
                    type="text"
                    placeholder="Twitter URL"
                    value={twitter}
                    onChange={(e) => handleFormChange(e)}
                  />
                </div>
                <div className="form-group createprofile social-link w-75">
                  <i className="fab fa-facebook fa-2x text-facebook"></i>
                  <input
                    name="facebook"
                    type="text"
                    placeholder="Facebook URL"
                    value={facebook}
                    onChange={(e) => handleFormChange(e)}
                  />
                </div>
                <div className="form-group createprofile social-link w-75">
                  <i className="fab fa-youtube fa-2x text-youtube"></i>
                  <input
                    name="youtube"
                    type="text"
                    placeholder="Youtube URL"
                    value={youtube}
                    onChange={(e) => handleFormChange(e)}
                  />
                </div>
                <div className="form-group createprofile social-link w-75">
                  <i className="fab fa-instagram fa-2x text-instagram"></i>
                  <input
                    name="instagram"
                    type="text"
                    placeholder="Instagram URL"
                    value={instagram}
                    onChange={(e) => handleFormChange(e)}
                  />
                </div>
                <div className="form-group createprofile social-link w-75">
                  <i className="fab fa-linkedin fa-2x text-linkedin"></i>
                  <input
                    name="linkedin"
                    type="text"
                    placeholder="Linkedin URL"
                    value={linkedin}
                    onChange={(e) => handleFormChange(e)}
                  />
                </div>
              </Fragment>
            )}
          </div>
          <input type="submit" className="btn btn-primary" />
          <Link to="/dashboard" className="btn btn-dark m-1">
            <i class="fas fa-backward"></i> Go Back
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(
  withRouter(CreateProfile) //! withRouter allows provides the history object within the props
);
