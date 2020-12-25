import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker.register("./service-worker.js");
//     // .then((reg) => console.log(`Service Worker: Registered ${reg.scope}`))
//     // .catch((err) => console.log(`Service Worker: Error: ${err}`));
//   });
// }

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
