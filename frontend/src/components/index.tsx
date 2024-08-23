import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CityProvider } from "./CityContext";  // Optional, if using Context API

ReactDOM.render(
  <CityProvider>
    <App />
  </CityProvider>,
  document.getElementById("root")
);
