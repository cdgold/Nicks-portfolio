import React from "react"
import Header from "./components/header.js"
import Home from "./components/home.js"
import Resume from "./components/resume.js"
import Projects from "./components/projects.js"

import {
  BrowserRouter as Router,
  Routes, Route, Link, useMatch, useNavigate
} from "react-router-dom"

const App = () => {
  document.body.style.backgroundColor = "#FFF8E7"
  const topStyle = { }
  return(
    <div style={topStyle}>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/resume"
          element={<Resume />}
        />
        <Route
          path="/projects"
          element={<Projects />}
        />
      </Routes>
      <p>{"dont"}</p>
    </div>
  )
}

export default App