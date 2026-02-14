import { StrictMode } from 'react'
import React from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from 'react-dom/client'
import "./styles/main.css";
import "./styles/global.css";
import "./styles/auth.css";
import "./styles/forms.css";
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
