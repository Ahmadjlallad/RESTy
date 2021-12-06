import React from "react";
import MakeJsonPretty from "./MakeJsonPretty";
import "./result.scss";
function Results({ data }) {
  return (
    <section>
      <pre>
        {/* <code>{data ? JSON.stringify(data, undefined, 2) : null}</code> */}
        <code>{data ? MakeJsonPretty(JSON.stringify(data)) : null}</code>
      </pre>
    </section>
  );
}

export default Results;
