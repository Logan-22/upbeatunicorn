import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";
import { Fragment } from "react";

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions,
}) => {
  return (
    <div className="post p-1 my-1 w-75">
      <div>
        <Link to={`/profile/${user}`} className="profile-link">
          <img src={avatar} alt={name} className="round-img" />
          <h4 className="text-primary">{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1 post-content">{text}</p>
        <p className="post-date mb-1">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>

        {showActions && (
          <Fragment>
            <button className="btn btn-dark" onClick={(e) => addLike(_id)}>
              <i className="fas fa-thumbs-up">
                {" "}
                {likes.length > 0 && <span> {likes.length}</span>}
              </i>
            </button>
            <button className="btn btn-dark" onClick={(e) => removeLike(_id)}>
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-primary">
              Discussion
              {comments.length > 0 && (
                <span className="comment-count"> {comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                className="btn btn-danger"
                onClick={(e) => deletePost(_id)}
              >
                <i className="fas fa-times" />
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { removeLike, addLike, deletePost })(
  PostItem
);
