import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import Heading from "./components/Heading";
import CarProvider from "./storage/CarProvider";
import UserProvider from "./storage/UserProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <CarProvider>
        <BrowserRouter>
          <Heading />
          <App />
        </BrowserRouter>
      </CarProvider>
    </UserProvider>
  </React.StrictMode>
);