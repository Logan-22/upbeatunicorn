import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfiles } from "../../actions/profile";
import ProfileItem from "./ProfileItem";

const Profiles = ({ theme, getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className={theme}>
          <div className="hundred-perc pages">
            <h1 className="large text-primary nav-margin pt-1">Profiles</h1>
            <p className="lead">
              <i className="fab fa-connectdevelop"></i> Browse Profiles
            </p>
            <div className="profiles pb-1">
              {profiles.length > 0 ? (
                profiles.map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              ) : (
                <h4>No Profiles Found</h4>
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  theme: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
