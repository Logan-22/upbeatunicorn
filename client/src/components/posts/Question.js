import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Question = ({ post, diff, codeType }) => {
  return (
    post.content.codeType === codeType && (
      <Link to={`/posts/${post._id}`} className="tdn">
        <div className="question w-80 mx-1 br1">
          <strong className={`que p-1 text-normal w-80`}>
            {post.content.title}
          </strong>
          <div></div>
          <div className={`band bg-${diff} w-10`}></div>
        </div>
      </Link>
    )
  );
};

Question.propTypes = {
  post: PropTypes.object.isRequired
};

export default Question;
