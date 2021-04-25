import React from "react";
import CodeEditor from "./CodeEditor";

const PostForm = () => (
  <div className="post-form">
    <div className="post-form-header bg-primary w-75">
      <h3>Say Something</h3>
    </div>
    <CodeEditor language="css" />
  </div>
);

export default PostForm;
