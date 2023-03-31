import React, { useState, useEffect } from "react"
import Header from "./components/header.js"
import Home from "./components/home.js"
import Resume from "./components/resume.js"
import Projects from "./components/projects.js"
import EditingPage from "./components/editingPage.js"
import resumeEntrysService from "./services/resumeEntrys"
import projectsService from "./services/projects"
import {
  Routes, Route
} from "react-router-dom"

const App = () => {

  const [resumeEntrys, setResumeEntrys] = useState([])
  const [projects, setProjects] = useState([])

  useEffect(() => {
    resumeEntrysService.getAll()
      .then(entrys => {
        setResumeEntrys(entrys)
      })
      .catch(error => {
        console.error("Error in resume component when fetching: ", error)
      })
    projectsService.getAll()
      .then(projects => {
        setProjects(projects)
      })
      .catch(error => {
        console.error("Error fetching projects service: ", error)
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
          element={<Projects projects={projects} />}
        />
      </Routes>
      <p>{"dont"}</p>
    </div>
  )
}

export default App