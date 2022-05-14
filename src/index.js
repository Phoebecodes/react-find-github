import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { AppProvider } from "./context/context";
import { Auth0Provider } from "@auth0/auth0-react";

//dev-60kiycss.us.auth0.com
//TqFKddZ3IUZ7poxSO2yj3fJ1MpAssx2s
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-60kiycss.us.auth0.com"
      clientId="TqFKddZ3IUZ7poxSO2yj3fJ1MpAssx2s"
      redirectUri={window.location.origin}
      cacheLocation="localstorage"
    >
      <AppProvider>
        <App />
      </AppProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
