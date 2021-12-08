import React from "react";
import "./result.scss";
import ReactJson from "react-json-view";
import MyDrawer from "../rSuite/Drower";
// use the component in your app!
import { Grid, Row, Col } from "rsuite";
function Results({ data, dataFromLocalSt, getUrlDispatcher }) {
  return (
    <Grid>
      <Row className="show-grid">
        <Col xs={12}>
          {dataFromLocalSt ? (
            <MyDrawer
              dataFromLocalSt={dataFromLocalSt}
              getUrlDispatcher={getUrlDispatcher}
            />
          ) : null}
        </Col>
        <Col xs={12}>
          <ReactJson src={data} theme="monokai" />
        </Col>
      </Row>
    </Grid>
  );
}

export default Results;
// {/* <code>{data ? JSON.stringify(data, undefined, 2) : null}</code> */}
// {/* {data ? MakeJsonPretty(JSON.stringify(data)) : null} */}
// {/* <JSONPretty json={data} /> */}
