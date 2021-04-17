import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

const Profile = ({
  theme,
  getProfileById,
  auth,
  profile: { profile, loading },
  match,
}) => {
  //* props.match - contains the url parameter within itself
  useEffect(
    () => {
      getProfileById(match.params.id);
    }, //* The url would contain -> /profile/:id
    [getProfileById, match.params]
  );
  return (
    <Fragment>
      <div className={theme}>
        <div className="hundred-perc pad-half-bottom">
          <h2 className="large text-primary nav-margin pt-1 ml-3">
            View Profile
          </h2>
          {profile === null || loading ? (
            <Spinner />
          ) : (
            <div>
              <Link to="/profiles" className="btn btn-custom ml-3">
                Back to Profiles
              </Link>
              {auth.isAuthenticated &&
                auth.loading === false &&
                auth.user._id === profile.user._id && (
                  <Link to="/edit-profile" className="btn btn-dark">
                    Edit Profile
                  </Link>
                )}
              <div className="profile-grid my-1">
                <ProfileTop profile={profile} />
                <ProfileAbout profile={profile} />
                <div className="profile-exp p-2">
                  <h2 className="large text-primary">Experience</h2>
                  {profile.experience.length > 0 ? (
                    <Fragment>
                      {profile.experience.map((exp) => (
                        <ProfileExperience key={exp._id} experience={exp} />
                      ))}
                    </Fragment>
                  ) : (
                    <h4>No Experience Credentials</h4>
                  )}
                </div>
                <div className="profile-edu p-2">
                  <h2 className="large text-primary">Education</h2>
                  {profile.education.length > 0 ? (
                    <Fragment>
                      {profile.education.map((edu) => (
                        <ProfileEducation key={edu._id} education={edu} />
                      ))}
                    </Fragment>
                  ) : (
                    <h4>No Education Credentials</h4>
                  )}
                </div>
                {profile.githubusername && (
                  <ProfileGithub username={profile.githubusername} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  theme: PropTypes.string.isRequired,
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
  profile: state.profile,
  auth: state.auth, //* To display edit profile button, if the profile is viewed by the same person
});

export default connect(mapStateToProps, { getProfileById })(Profile);
