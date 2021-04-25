import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItem = ({
  profile: {
    user: { _id, avatar },
    name,
    status,
    company,
    skills,
  },
}) => {
  return (
    <Fragment>
      <div className="profile p-1 mt-1">
        <img className="round-img" src={avatar} alt={name} />
        <div>
          <h2>{name}</h2>
          <p>
            {status} {company && <span>at {company}</span>}
          </p>
          <p className="my-1">{}</p>
          <Link to={`/profile/${_id}`} className="btn btn-primary">
            View Profile
          </Link>
        </div>
        <div>
          <ul>
            {skills.map((skill, index) => (
              <li key={index} className="text-success">
                <i className="fas fa-check"></i> {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
