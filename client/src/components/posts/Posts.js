import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import PostItem from "./PostItem";
import Alert from "../layout/Alert";
import PostForm from "./PostForm";

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <Fragment>
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="hundred-perc pages pad-half-bottom">
            <h1 className="large nav-margin text-primary">Posts</h1>
            <p className="lead">
              <i className="fas fa-user"></i> Welcome to the Community
            </p>
            <Alert />
            <PostForm />
            <div className="posts">
              {posts.map((post) => (
                <PostItem key={post._id} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
