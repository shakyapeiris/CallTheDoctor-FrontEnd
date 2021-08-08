import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import LocationContextProvider from "./Context/LocationContext";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./Context/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <LocationContextProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthContextProvider>
    </LocationContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.register();
