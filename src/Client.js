import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Router from "./utils/Router";
import store from "./redux/store";

const Client = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  );
};

export default Client;
