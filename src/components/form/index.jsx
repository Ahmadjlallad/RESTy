import React, { useEffect } from "react";
import { Button } from "rsuite";

import "./form.scss";

function Form({ dispatcher, selectedUrl }) {
  const isActive = (id, elementId) => (id === elementId ? "active" : "");
  const [method, setMethod] = React.useState("get");
  const [url, setUrl] = React.useState(selectedUrl);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      method,
      url: e.target.url.value,
      body: e.target.myTextArea.value
        ? JSON.parse(e.target.myTextArea.value)
        : {},
    };
    dispatcher({ type: "updateRequest", payload: formData });
  };
  React.useEffect(() => {
    setUrl(selectedUrl.url);
  }, [selectedUrl]);
  console.log(selectedUrl.url);
  return (
    <form onSubmit={handleSubmit}>
      <label className="url">
        <div>URL: </div>
        <input
          name="url"
          type="text"
          required
          onChange={(e) => setUrl(e.target.value)}
          value={url}
        />
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
        <Button color="orange" appearance="primary">
          Orange
        </Button>
        <Button
          color="orange"
          appearance="primary"
          className={isActive(method, "get")}
          id="get"
        >
          GET
        </Button>
        <Button
          color="orange"
          appearance="primary"
          className={isActive(method, "post")}
          id="post"
        >
          POST
        </Button>
        <Button
          color="orange"
          appearance="primary"
          className={isActive(method, "put")}
          id="put"
        >
          PUT
        </Button>
        <Button
          color="orange"
          appearance="primary"
          className={isActive(method, "delete")}
          id="delete"
        >
          DELETE
        </Button>
      </label>
      <textarea id="textarea" name="myTextArea" rows="4" cols="50" />
    </form>
  );
}

export default Form;
