import React from "react";
import PropTypes from "prop-types";

const ProfileTop = ({
  profile: {
    user: { avatar },
    name,
    status,
    company,
    social,
  },
}) => {
  return (
    <div className="profile-top">
      <img src={avatar} alt="name" className="round-img my-1" />
      <h1 className="large text-semidark">{name}</h1>
      <p className="lead">
        {status} {company && <span>at {company}</span>}
      </p>
      <div className="icons mt-1 pad-half">
        {social && social.facebook && (
          <a href={social.facebook} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook fa-2x col-facebook"></i>
          </a>
        )}
        {social && social.youtube && (
          <a href={social.youtube} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube fa-2x col-youtube"></i>
          </a>
        )}
        {social && social.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin fa-2x col-linkedin"></i>
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram fa-2x col-instagram"></i>
          </a>
        )}

        {social && social.twitter && (
          <a href={social.twitter} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter fa-2x col-twitter"></i>
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
