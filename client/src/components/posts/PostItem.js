import React, { useState, useEffect, useMemo, useRef, createRef } from "react";
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
  post: {
    _id,
    text,
    content: {
      question,
      codeText,
      codeType,
      optionsType,
      options,
      rating,
      explanation
    },
    name,
    avatar,
    user,
    likes,
    comments,
    date
  },
  showActions
}) => {
  const [answers, setAnswers] = useState([]);
  const givenAnswer = useMemo(() => [], []);
  const elementRefs = useRef([]);
  const optionsLength = options.length;
  const [disableCheckbox, setDisableCheckbox] = useState(false);

  //* Highlighting the options that are selected , correct and wrong

  useEffect(() => {
    console.log("%cMounted", "color:yellow;font-weight:bold");
    elementRefs.current = Array(optionsLength)
      .fill()
      .map((_, i) => elementRefs.current[i] || createRef());
  }, [optionsLength]);

  const handleSubmit = (e) => {
    e.preventDefault();
    var flag;
    for (let i = 0; i < options.length; i++) {
      if (answers.includes(`option${i}`)) {
        givenAnswer.push("true");
      } else {
        givenAnswer.push("false");
      }
    }
    console.log(
      `%cGiven Answer : %c${givenAnswer}`,
      "font-weight:bold",
      "color:blue"
    );

    const correctAns = [];
    options.map((ele) => correctAns.push(ele.isCorrect.toString()));
    console.log(
      `%cCorrect Answer : %c${correctAns}`,
      "font-weight:bold",
      "color:green"
    );
    for (let k = 0; k < optionsLength; k++) {
      if (givenAnswer[k] === correctAns[k]) {
        flag = 1;
      } else {
        flag = 0;
        break;
      }
    }
    console.log(`%c${flag}`, "color:chocolate");
    elementRefs.current.forEach((ele, ind) => {
      console.log(ele.current);
      console.log(givenAnswer);
      if (givenAnswer[ind] === "true") {
        ele.current.className = `my-1 post-content dfstart option option-${
          flag === 1 ? "correct" : "wrong"
        }`;
        setDisableCheckbox(true);
        if (flag === 0) {
          setTimeout(() => {
            givenAnswer.length = 0;
            setDisableCheckbox(false);
            ele.current.className =
              "my-1 post-content dfstart option option-checked";
          }, 3000);
        }
      }
    });
  };

  return (
    <div className="post p-1 my-1 w-75">
      <div>
        <Link to={`/profile/${user}`} className="profile-link">
          <img src={avatar} alt={name} className="round-img" />
          <h4 className="text-primary">{name}</h4>
        </Link>
      </div>
      <div className="prewrap">
        {question && <strong className="my-1 post-content">{question}</strong>}
        {text && <p className="my-1 post-content">{text}</p>}
        {codeText && (
          <pre className="my-2 post-content code-text">
            <code className={`language-${codeType}`}>{codeText}</code>
          </pre>
        )}
        {codeType && <p className="my-1 post-content">{codeType}</p>}
        {optionsType && <p className="my-1 post-content">{optionsType}</p>}
        <form onSubmit={handleSubmit}>
          {options &&
            options.map((option, index) => (
              <div
                className={`my-1 post-content dfstart option ${
                  answers.includes(`option${index}`) ? "option-checked" : null
                }`}
                key={option._id}
                ref={elementRefs.current[index]}
              >
                <input
                  type={optionsType === "multipleChoice" ? "checkbox" : "radio"}
                  className="m-1 options"
                  value={`option${index}`}
                  name="option"
                  disabled={disableCheckbox}
                  onChange={
                    optionsType === "multipleChoice"
                      ? (e) =>
                          setAnswers((currentAnswers) => {
                            if (answers.includes(`option${index}`)) {
                              return currentAnswers.filter(
                                (opt) => opt !== `option${index}`
                              );
                            } else {
                              return [...currentAnswers, e.target.value];
                            }
                          })
                      : (e) => setAnswers(e.target.value)
                  }
                />
                <p className="text mx-1">{option.optionsText}</p>
              </div>
            ))}
          <p>{answers}</p>
          <button className="btn btn-primary my-1">
            <p>Submit</p>
          </button>
        </form>
        {explanation && <p className="my-1 post-content">{explanation}</p>}
        {rating && <p className="my-1 post-content">{rating}</p>}
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
  showActions: true
};

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { removeLike, addLike, deletePost })(
  PostItem
);
