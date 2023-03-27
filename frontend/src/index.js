import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter as Router } from "react-router-dom"
import Theme from "./theme/Theme"
import GlobalStyle from "./theme/GlobalStyle"
import styled from "styled-components"

ReactDOM.createRoot(document.getElementById("root")).render(
  <Theme>
    <GlobalStyle/>
    <Router>
      <App />
    </Router>
  </Theme>
)