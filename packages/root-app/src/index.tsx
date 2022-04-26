import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CustomComponents } from "./store/CustomComponents/CustomComponents";
import set from "lodash.set";

window.react = React;

set(window, "im.component", new CustomComponents());

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
