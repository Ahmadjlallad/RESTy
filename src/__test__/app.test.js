import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import App from "../app";

test("loads and displays the starting app", async () => {
  render(<App />);
  const personName = await waitFor(() => screen.getByTestId("url"));
  expect(personName).toHaveTextContent("GO!");
});

test("can get methods", async () => {
  render(<App />);

  const method = screen.getByTestId("method");

  expect(method).toHaveTextContent("get");
});
