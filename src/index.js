import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="simplifieddataanalysis.us.auth0.com"
    clientId="PRJ5YhyeGAY4aVQhGKT8KRCYgGgW96mW"
    redirectUri={window.location.origin}
    audience="https://simplifieddataanalysis.us.auth0.com/api/v2/"
    scope="read:current_user update:current_user_metadata"
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);