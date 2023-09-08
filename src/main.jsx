import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./Contexts/UserContext.jsx";
import { TopicsProvider } from "./Contexts/TopicsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <TopicsProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </TopicsProvider>
    </React.StrictMode>
  </BrowserRouter>
);
