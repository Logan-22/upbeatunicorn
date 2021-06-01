import { useState, useEffect } from "react";
import Prism from "prismjs";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import "../../dist/css/prism.css";
import "../../utils/prism-utils/prism-python";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import { setAlert } from "../../actions/alert";
import Alert from "../layout/Alert";
import StarRatings from "react-star-ratings";

const PostForm = ({ addPost, setAlert }) => {
  const [content, setContent] = useState({
    title: "",
    question: "",
    codeText: "",
    codeType: "",
    optionsType: "",
    options: [{ id: uuid(), optionsText: "", isCorrect: "false" }],
    explanation: "",
    rating: 0
  });
  const {
    title,
    question,
    codeText,
    codeType,
    options,
    optionsType,
    rating,
    explanation
  } = content;
  const handleKeyDown = (evt) => {
    let value = codeText,
      selStartPos = evt.currentTarget.selectionStart;

    console.log(evt.currentTarget);

    //* handle 4-space indent

    if (evt.key === "Tab") {
      value =
        value.substring(0, selStartPos) +
        "    " +
        value.substring(selStartPos, value.length);
      evt.currentTarget.selectionStart = selStartPos + 3;
      evt.currentTarget.selectionEnd = selStartPos + 4;
      evt.preventDefault();

      setContent({ ...content, codeText: value });
    }
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [codeType, codeText]);

  const handleChange = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };

  const changeRating = (rating) => {
    setContent((currentContent) => {
      return {
        ...currentContent,
        rating: rating
      };
    });
  };

  return (
    <div className="post-form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addPost(content);
          window.scroll(0, 0);
          setContent({
            title: "",
            question: "",
            codeText: "",
            codeType: "",
            optionsType: "",
            options: [{ id: uuid(), optionsText: "", isCorrect: "false" }],
            rating: 0,
            explanation: ""
          });
        }}
        className="form-important my-1"
      >
        <div className="post-form-header bg-primary w-75">
          <h3>Post your Question!</h3>
        </div>
        <div className="my-1">
          <strong>
            <label htmlFor="txtarea">
              Enter a Tile for your Question<sup>*</sup>
            </label>
          </strong>
          <textarea
            placeholder={`Enter your Title here${(<sup>*</sup>)}`}
            id="txtarea-1"
            className="w-75"
            name="title"
            value={title}
            onChange={(e) => handleChange(e)}
          >
            {question}
          </textarea>
          <strong>
            <label htmlFor="txtarea">
              Enter your question<sup>*</sup>
            </label>
          </strong>
          <textarea
            placeholder={`Enter your Question here${(<sup>*</sup>)}`}
            id="txtarea-2"
            className="w-75"
            name="question"
            value={question}
            onChange={(e) => handleChange(e)}
          >
            {question}
          </textarea>
        </div>
        <div className="codeType">
          <strong>
            <label htmlFor="langselect">Choose Language</label>
          </strong>
          <select
            id="langselect"
            name="codeType"
            value={codeType}
            onChange={(e) => handleChange(e)}
          >
            <option value="0">Choose Language</option>
            <option value="py">Python</option>
            <option value="js">Javascript</option>
            <option value="css">CSS</option>
            <option value="html">HTML</option>
          </select>
        </div>
        <div className="code-edit-container w-75">
          <textarea
            placeholder="Enter your code here"
            className="code-input"
            value={codeText}
            name="codeText"
            onChange={(e) => handleChange(e)}
            onKeyDown={handleKeyDown}
            spellCheck="false"
          />
          <pre className="code-output">
            <code className={`code language-${codeType}`}>{codeText}</code>
          </pre>
        </div>
        <div className="answers">
          <h3 className="bg-primary w-75">Enter options below</h3>
          <select
            className="my-1"
            name="optionsType"
            value={optionsType}
            onChange={(e) => {
              handleChange(e);
              setContent((currentContent) => {
                return {
                  ...currentContent,
                  options: options.map((opt) => {
                    return { ...opt, isCorrect: "false" };
                  })
                };
              });
            }}
          >
            <option value="0">Choose Options Type</option>
            <option value="multipleChoice">Multiple Correct Answers</option>
            <option value="singleChoice">Single Correct Answer</option>
          </select>
          <Alert />
          {options &&
            options.map((option, index) => (
              <div key={option.id} className="my-1">
                <label htmlFor={`option${index}`}>
                  <h4>{`Option ${index + 1}`}</h4>
                </label>
                <div className="dfstart">
                  <textarea
                    value={option.optionsText}
                    className="my-1 w-50"
                    type="text"
                    id="txtarea-2"
                    placeholder={`Enter Option${index + 1}`}
                    autoComplete="off"
                    spellCheck="false"
                    onChange={(e) =>
                      setContent((currentContent) => {
                        let optionsText = e.target.value;
                        return {
                          ...currentContent,
                          options: options.map((opt) =>
                            opt.id === option.id ? { ...opt, optionsText } : opt
                          )
                        };
                      })
                    }
                  ></textarea>
                  <div>
                    <label htmlFor="optionCorrect" className="mx-1">
                      Correct Answer?
                    </label>
                    <input
                      type={
                        optionsType === "multipleChoice" ? "checkbox" : "radio"
                      }
                      name="optionCorrect"
                      value={option.isCorrect === "true"}
                      className="optionCorrect"
                      id="optionCorrect"
                      checked={option.isCorrect === "true"}
                      onChange={(e) => {
                        setContent((currentContent) => {
                          if (optionsType === "multipleChoice") {
                            return {
                              ...currentContent,
                              options: options.map((opt) =>
                                opt.id === option.id
                                  ? {
                                      ...opt,
                                      isCorrect:
                                        e.target.value === "true"
                                          ? "false"
                                          : "true"
                                    }
                                  : opt
                              )
                            };
                          } else if (optionsType === "singleChoice") {
                            return {
                              ...currentContent,
                              options: options.map((opt) =>
                                opt.id === option.id
                                  ? { ...opt, isCorrect: "true" }
                                  : { ...opt, isCorrect: "false" }
                              )
                            };
                          } else {
                            console.log("object");
                            setAlert("Choose Options Type", "danger");
                            return currentContent;
                          }
                        });
                      }}
                    />
                  </div>
                  <button
                    className="btn btn-danger mx-1 p-1"
                    onClick={(e) => {
                      e.preventDefault();
                      setContent((currentContent) => {
                        return {
                          ...currentContent,
                          options: options.filter((opt) => opt.id !== option.id)
                        };
                      });
                    }}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          <button
            className="btn btn-primary mt-1"
            onClick={(e) => {
              e.preventDefault();
              setContent((currentContent) => {
                return {
                  ...currentContent,
                  options: options.concat({
                    id: uuid(),
                    optionsText: "",
                    isCorrect: false
                  })
                };
              });
            }}
          >
            <h4>Add Option</h4>
          </button>
        </div>

        <div className="explanation my-1">
          <strong>
            <label htmlFor="txtarea">
              Please provide a brief explanation for your Q&A
            </label>
          </strong>
          <textarea
            name="explanation"
            id="txtarea-3"
            value={explanation}
            className="w-75"
            autoComplete="off"
            onChange={(e) => handleChange(e)}
          ></textarea>
        </div>
        <div className="rating my-1">
          <strong>
            <label htmlFor="rating">Difficulty Rating:</label>
          </strong>
          <StarRatings
            id="rating"
            rating={rating}
            starEmptyColor="gray"
            starRatedColor="gold"
            starHoverColor="gold"
            changeRating={(rating) => changeRating(rating)}
          />
        </div>
        <button className="btn btn-success mb-2 w-75" type="submit">
          <h3 className="p-1">Post your Question!</h3>
        </button>
      </form>
      {/* <pre>{JSON.stringify(content, null, 2)}</pre> */}
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

// const mapDispatchToProps = (dispatch) => ({
//   addPost: (formData) => dispatch(addPost(formData)),
//   setAlert: (msg, alertType) => dispatch(setAlert(msg, alertType))
// });

export default connect(null, { addPost, setAlert })(PostForm);
