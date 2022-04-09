import React from "react";

import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import "./styles/style.css";

const root = document.getElementById("root");
const RenderApp = ReactDOMClient.createRoot(root);

RenderApp.render(<App />);
