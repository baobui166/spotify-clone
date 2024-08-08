import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChildProvider, StateContext } from "./utils/StateProvider";
import reducer, { intialState } from "./utils/reducer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChildProvider initialState={intialState} reducer={reducer}>
      <App />
    </ChildProvider>
  </React.StrictMode>
);
