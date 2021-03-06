import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { GithubProvider } from "./context/context";
import { Auth0Provider } from "@auth0/auth0-react";

//olsauth.us.auth0.com
//pNgPsAjBaRSvjvnDSVa4zi7IPzX3v2dS

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="olsauth.us.auth0.com"
      clientId="pNgPsAjBaRSvjvnDSVa4zi7IPzX3v2dS"
      redirectUri={window.location.origin}
      // Ensure that the Auth0 information is cached locally
      // This ensures that e.g. when we navigate to the 404 error page
      // we will not be logged out when we click the "back to home" button
      cacheLocation="localstorage"
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
