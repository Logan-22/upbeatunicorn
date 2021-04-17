import React from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({ profile: { bio, skills, name } }) => {
  return (
    <div className="profile-about p-2">
      {bio && (
        <h2 className="text-primary">
          {name && name.trim().split(" ")[0]}'s bio
        </h2>
      )}
      <p>{bio}</p>
      <div className="line"></div>
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {skills.map((skill, index) => (
          <div key={index} className="p-1">
            <i className="fa fa-check">{skill}</i>
          </div>
        ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
