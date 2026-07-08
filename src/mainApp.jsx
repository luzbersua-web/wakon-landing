import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import StartNowApp from "./StartNowApp";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StartNowApp />
  </React.StrictMode>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/app/sw.js", { scope: "/app/" }).catch(() => {});
  });
}
