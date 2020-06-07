import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { Router } from "react-router-dom";
import thunk from "redux-thunk";
import {createMemoryHistory} from 'history';
import { render } from '@testing-library/react';

export function renderWithReduxAndRouter(
  ui,
  { initialState, reducer } = {},
  { route = "/" } = {}
) {
  if (!initialState) {
    // eslint-disable-next-line no-param-reassign
    initialState = {};
  }
  if (!reducer) {
    // eslint-disable-next-line no-param-reassign
    reducer = (s) => s;
  }
  const store = createStore(reducer, initialState, applyMiddleware(thunk));
  const history = createMemoryHistory({ initialEntries: [route] });
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>{ui}</Router>
      </Provider>
    ),
    history,
    store,
  };
}
