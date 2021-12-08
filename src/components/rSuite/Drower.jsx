import { Drawer } from "rsuite";
import React from "react";
import Button from "rsuite/Button";
import "rsuite/dist/rsuite.min.css";

const getColor = (method) => {
  switch (method) {
    case "get":
      return "green";
    case "post":
      return "blue";
    case "put":
      return "orange";
    case "delete":
      return "red";
    default:
      return "violet";
  }
};
const MyDrawer = ({ dataFromLocalSt, getUrlDispatcher }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const renderUrls = () =>
    dataFromLocalSt.map((item, index) => {
      return (
        <div key={index}>
          <Button
            color={getColor(item.method)}
            appearance="primary"
            onClick={() => {
              getUrlDispatcher({ type: "updateSelectedUrl", payload: item });
              setOpen(false);
            }}
          >
            {item.url}
          </Button>
        </div>
      );
    });
  return (
    <>
      <Button color="orange" onClick={() => handleOpen()} appearance="primary">
        History
      </Button>
      <Drawer
        size={"md"}
        placement={"bottom"}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Drawer.Header>
          <Drawer.Title></Drawer.Title>
          <Drawer.Actions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)} appearance="primary">
              Confirm
            </Button>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>{renderUrls()}</Drawer.Body>
      </Drawer>
    </>
  );
};
export default MyDrawer;
