import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const ProfileItem = ({
  theme,
  profile: {
    user: { _id, avatar },
    name,
    status,
    company,
    skills,
  },
}) => {
  return (
    <div className={theme}>
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
                <i className="fas fa-check"></i> {skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  theme: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps)(ProfileItem);
