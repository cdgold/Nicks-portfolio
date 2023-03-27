import React from "react"
import Header from "./components/header.js"
import Home from "./components/home.js"
import Resume from "./components/resume.js"
import Projects from "./components/projects.js"
import {
  BrowserRouter as Router,
  Routes, Route, Link, useMatch, useNavigate
} from "react-router-dom"
import styled from "styled-components"

const App = () => {
  //document.body.style.backgroundColor = "#FFF8E7" // equivalent to theme beige

  // checks for subdomain "edit" to return proper page
  if (window.location.host.split(".")[0] === "edit") {
    return(
      <h1>
            Login
      </h1>
    )
  }
  // else, default landing page
  return(
    <div>
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