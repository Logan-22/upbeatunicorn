import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="info">Dashboard</h1>
      <p className="info">
        Welcome {profile && profile.name ? profile.name : user.email}
      </p>
      {profile !== null ? (
        <Fragment>
          <Spinner/>
          <h1>Hello {profile.name}</h1>
        </Fragment>
      ) : (
        <Fragment>
          <p>
            You have not yet created a profile. Please create a profile to post
            your content here and to provide your feedback
          </p>
          <Link to="/create-profile" className="buttons" />
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    profile: state.profile,
  };
};

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
