import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Alert from "../layout/Alert";

const DashboardActions = () => {
  return (
    <Fragment>
      <Alert />
      <div className="dash-buttons">
        <Link to="/edit-profile" className="btn btn-light dash-links">
          <i className="fas fa-user-circle text-primary"></i>
          <span className="text-primary p-1"> Edit Profile</span>
        </Link>
        <Link to="/add-experience" className="btn btn-light dash-links">
          <i className="fas fa-user-tie text-primary"></i>
          <span className="text-primary p-1"> Add Experience</span>
        </Link>
        <Link to="/add-education" className="btn btn-light dash-links">
          <i className="fas fa-user-graduate text-primary"></i>
          <span className="text-primary p-1"> Add Education</span>
        </Link>
      </div>
    </Fragment>
  );
};

export default DashboardActions;
