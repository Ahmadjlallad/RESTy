import React from "react";

import "./app.scss";

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from "./components/header";
import Footer from "./components/footer";
import Form from "./components/form";
import Results from "./components/results";
import axios from "axios";

function App() {
  const [state, setState] = React.useState({
    data: null,
    requestParams: {
      method: "get",
    },
  });
  const callApi = async (requestParams) => {
    const data = await axios[requestParams.method](requestParams.url);
    console.log(data);
    setState({ data, requestParams });
  };

  return (
    <React.Fragment>
      <Header />
      <div data-testid="method">
        Request Method: {state.requestParams.method}
      </div>
      <div>URL: {state.requestParams.url}</div>
      <Form handleApiCall={callApi} />
      <Results data={state.data} />
      <Footer />
    </React.Fragment>
  );
}

export default App;
