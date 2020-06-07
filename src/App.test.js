import React from "react";
import { renderWithReduxAndRouter } from "./utilities/testUtilities";
import App from "./App";

test("render dashboard correctly", () => {
  const { getByText } = renderWithReduxAndRouter(<App />);
  const header = getByText(/Tasklist Dashboard/i);
  expect(header).toBeInTheDocument();

  const link = getByText(/create list/i);
  expect(link).toBeInTheDocument();
});

test("create new list", () => {
  const { getByText } = renderWithReduxAndRouter(<App />);
  const list = getByText(/create list/i);
  expect(list).toBeInTheDocument();
});
