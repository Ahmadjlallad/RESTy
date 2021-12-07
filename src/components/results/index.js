import React from "react";
import "./result.scss";
import ReactJson from "react-json-view";

// use the component in your app!

function Results({ data }) {
  return (
    <div className="result">
      <ReactJson src={data} theme="monokai" />
    </div>
  );
}

export default Results;
// {/* <code>{data ? JSON.stringify(data, undefined, 2) : null}</code> */}
// {/* {data ? MakeJsonPretty(JSON.stringify(data)) : null} */}
// {/* <JSONPretty json={data} /> */}
