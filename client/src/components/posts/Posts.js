import React, { Fragment, useEffect, useState, useRef, createRef } from "react";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import Question from "./Question";
import { codeTypes, difficultyTypes } from "./codeTypes";
import { getPostsByCodeType } from "../../actions/post";

const Posts = ({ getPostsByCodeType, post: { posts, loading } }) => {
  const [codeType, setCodeType] = useState("py");

  const codeTypeLength = codeTypes.length;

  const imageReference = useRef([]);

  useEffect(() => {
    imageReference.current = Array(codeTypeLength)
      .fill()
      .map((_, i) => imageReference.current[i] || createRef());
  }, [codeTypeLength]);

  const handleImageClick = (e) => {
    console.log(e.target.name, e.target.id);
    (e.target.name && setCodeType(codeTypes[e.target.name])) ||
      (e.target.id && setCodeType(codeTypes[e.target.id]));
    imageReference.current.forEach((curr, index) => {
      if (
        String(index) === String(e.target.name) ||
        String(index) === String(e.target.id)
      ) {
        curr.current.className = `code-type-div div-${index} active`;
      } else {
        curr.current.className = `code-type-div div-${index} inactive`;
      }
    });
  };

  useEffect(() => {
    getPostsByCodeType(codeType);
  }, [codeType, getPostsByCodeType]);

  return (
    <Fragment>
      <div className="h-100">
        {loading ? (
          <Spinner />
        ) : (
          <div className="hundred-perc pages pad-half-bottom">
            <h1 className="large nav-margin text-primary">Questions</h1>
            <p className="lead">
              <i className="fas fa-user"></i> Begin to Learn!
            </p>
            <div className="post-grid w-75">
              {codeTypes.map((ctype, index) => {
                return (
                  <div
                    key={index}
                    id={index}
                    className={`code-type-div div-${index} ${
                      index === 0 ? "active" : "inactive"
                    }`}
                    ref={imageReference.current[index]}
                    onClick={(e) => handleImageClick(e)}
                  >
                    <img
                      src={`./${ctype}.png`}
                      alt={ctype}
                      name={index}
                      className="code-type-image"
                    />
                  </div>
                );
              })}
              <div className="questions-grid">
                {difficultyTypes.map((diff) => (
                  <div className={`${diff}-grid my-1`}>
                    <h1 className={`text-${diff} capitalize tac`}>{diff}</h1>
                    {posts.map((post) => (
                      <Question
                        key={post._id}
                        post={post}
                        diff={diff}
                        codeType={codeType}
                      />
                    ))}
                  </div>
                ))}
              </div>
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
  getPostsByCodeType: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPostsByCodeType })(
  Posts
);
