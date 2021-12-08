import React from "react";

import "./app.scss";

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from "./components/header";
import Footer from "./components/footer";
import Form from "./components/form";
import Results from "./components/results";
import axios from "axios";
const uniqueUrl = (url) => {
  const urlObject = JSON.parse(localStorage.getItem("urls") || "{}");
  if (urlObject instanceof Array)
    return !urlObject.find((item) => item.url === url);
  else return true;
};

const initState = {
  method: "get",
  url: "",
  body: {},
  data: null,
  urlInLs: JSON.parse(localStorage.getItem("urls")),
  selectedUrl: "",
};
const reducer = (state = initState, action) => {
  switch (action.type) {
    case "updateApi":
      return { ...state, data: action.payload };
    case "updateRequest": {
      if (uniqueUrl(action.payload.url))
        localStorage.setItem(
          "urls",
          JSON.stringify([
            ...(JSON.parse(localStorage.getItem("urls")) || []),
            action.payload,
          ])
        );
      return {
        ...state,
        method: action.payload.method,
        body: action.payload.body,
        url: action.payload.url,
        urlInLs: JSON.parse(localStorage.getItem("urls")),
      };
    }
    case "updateSelectedUrl":
      return { ...state, selectedUrl: action.payload };
    default:
      return state;
  }
};
function App() {
  const [
    { urlInLs, url, method, body, data: apiData, selectedUrl },
    appDispatcher,
  ] = React.useReducer(reducer, initState);

  const callApi = async (requestParams = null) => {
    try {
      if (requestParams.url === "") return;
      const data = await axios[requestParams.method](requestParams.url, body);
      appDispatcher({ type: "updateApi", payload: data });
    } catch (error) {
      appDispatcher({ type: "updateApi", payload: error });
    }
  };
  React.useEffect(() => {
    (async () => {
      await callApi({ url, method, body });
    })();
  }, [url, method, body]);
  return (
    <React.Fragment>
      <Header />
      <div data-testid="method">Request Method: {method}</div>
      <div>URL: {url}</div>
      <Form dispatcher={appDispatcher} selectedUrl={selectedUrl} />
      <Results
        data={apiData}
        dataFromLocalSt={urlInLs}
        getUrlDispatcher={appDispatcher}
      />
      <Footer />
    </React.Fragment>
  );
}

export default App;
