import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";

import { App } from "./components/app";

import "./styles/style.scss";

ReactDOM.render(
  <Provider store={store}>
    <App store={store} />
  </Provider>,
  document.body.querySelector(".app")
);
