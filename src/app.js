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
  const [apiData, setApiData] = React.useState({
    data: null,
  });
  const [{ url, method, body }, setRequestParams] = React.useState({
    method: "get",
    url: "",
    body: {},
  });
  const callApi = async (requestParams = null) => {
    try {
      if (requestParams.url === "") return;
      const data = await axios[requestParams.method](requestParams.url, body);
      console.log(data);
      setApiData({ data });
    } catch (error) {
      setApiData({ error });
    }
  };
  React.useEffect(() => {
    console.log(body);
    (async () => {
      await callApi({ url, method, body });
    })();
  }, [url, method, body]);
  return (
    <React.Fragment>
      <Header />
      <div data-testid="method">Request Method: {method}</div>
      <div>URL: {url}</div>
      <Form handleApiCall={setRequestParams} />
      <Results data={apiData} />
      <Footer />
    </React.Fragment>
  );
}

export default App;
