import React, { useState, useEffect } from "react"
import Header from "./components/header.js"
import Home from "./components/home.js"
import Resume from "./components/resume.js"
import Projects from "./components/projects.js"
import EditingPage from "./components/editingPage.js"
import resumeEntrysService from "./services/resumeEntrys"
import {
  Routes, Route
} from "react-router-dom"

const App = () => {
  //document.body.style.backgroundColor = "#FFF8E7" // equivalent to theme beige

  const [resumeEntrys, setResumeEntrys] = useState([])

  useEffect(() => {
    resumeEntrysService.getAll()
      .then(entrys => {
        console.log("Fetched entrys: ", entrys)
        setResumeEntrys(entrys)
      })
      .catch(error => {
        console.error("Error in resume component when fetching: ", error)
      })
  }, [])

  // checks for subdomain "edit" to return proper page
  if (window.location.host.split(".")[0] === "edit") {
    return(
      <EditingPage />
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
          element={<Resume resumeEntrys={resumeEntrys} />}
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