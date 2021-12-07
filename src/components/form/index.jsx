import React from "react";

import "./form.scss";

function Form({ handleApiCall }) {
  const isActive = (id, elementId) => (id === elementId ? "active" : "");
  const [method, setMethod] = React.useState("get");
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      method,
      url: e.target.url.value,
      body: e.target.myTextArea.value
        ? JSON.parse(e.target.myTextArea.value)
        : {},
    };
    handleApiCall(formData);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label className="url">
        <div>URL: </div>
        <input name="url" type="text" />
        <button data-testid="url" type="submit">
          GO!
        </button>
      </label>
      <label
        className="methods methodsContainer"
        onClick={(e) => {
          if (e.target.tagName === "SPAN") {
            setMethod(e.target.id);
          }
        }}
      >
        <span className={isActive(method, "get")} id="get">
          GET
        </span>
        <span className={isActive(method, "post")} id="post">
          POST
        </span>
        <span className={isActive(method, "put")} id="put">
          PUT
        </span>
        <span className={isActive(method, "delete")} id="delete">
          DELETE
        </span>
      </label>
      <textarea id="textarea" name="myTextArea" rows="4" cols="50" />
    </form>
  );
}

export default Form;
