import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "contexts/AuthContext";
import { UserProvider } from "contexts/UserContext";

ReactDOM.render(
  <AuthProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </AuthProvider>,
  document.getElementById("root")
);
