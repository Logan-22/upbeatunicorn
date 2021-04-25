import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteAccount, getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  deleteAccount,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="hundred-perc pages">
        <h1 className="large nav-margin text-primary pt-1">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome{" "}
          {profile && profile.name
            ? profile.name
            : user && user.email && user.email}
        </p>
        {profile !== null ? (
          <Fragment>
            <DashboardActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div className="mt-2 bot-padding">
              <button
                onClick={() => deleteAccount()}
                className="btn btn-danger"
              >
                <i className="fas fa-user-minus"></i> Delete My Account
              </button>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <p>
              You have not yet created a profile. Please create a profile to
              post your content.
            </p>
            <Link to="/create-profile" className="btn btn-success my-1">
              Create Profile
            </Link>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    profile: state.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentProfile: () => dispatch(getCurrentProfile()),
    deleteAccount: () => dispatch(deleteAccount()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
