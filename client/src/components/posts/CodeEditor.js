import React, { useState, useEffect, Fragment } from "react";
import Prism from "prismjs";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import "../../dist/css/prism.css";
import PropTypes from "prop-types";

const CodeEditor = ({ addPost, language, contents }) => {
  const [content, setContent] = useState(contents);

  const handleKeyDown = (evt) => {
    let value = content,
      selStartPos = evt.currentTarget.selectionStart;

    console.log(evt.currentTarget);

    // handle 4-space indent on
    if (evt.key === "Tab") {
      value =
        value.substring(0, selStartPos) +
        "    " +
        value.substring(selStartPos, value.length);
      evt.currentTarget.selectionStart = selStartPos + 3;
      evt.currentTarget.selectionEnd = selStartPos + 4;
      evt.preventDefault();

      setContent(value);
    }
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [language, content]);

  return (
    <Fragment>
      <div className="code-edit-container w-75">
        <textarea
          className="code-input"
          value={content}
          onChange={(evt) => setContent(evt.target.value)}
          onKeyDown={handleKeyDown}
        />
        <pre className="code-output">
          <code className={`language-${language}`}>{content}</code>
        </pre>
      </div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addPost({ text: content });
            window.scroll(0, 0);
            setContent("");
          }}
          className="code-edit-form my-1"
        >
          <input type="submit" value="Submit" className="btn btn-primary" />
        </form>
      </div>
    </Fragment>
  );
};

CodeEditor.propTypes = {
  addPost: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};

export default connect(null, { addPost })(CodeEditor);
