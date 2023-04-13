import React, { useState, useEffect } from "react"
import loginService from "../services/login"
import ResumeEntrysEditing from "./editingPageComponents/resumeEntrysEditing"
import ProjectsEditing from "./editingPageComponents/projectsEditing"
import resumeEntrysService from "../services/resumeEntrys"
import projectsService from "../services/projects"
import styled from "styled-components"

const setTokens = (token) => {
  resumeEntrysService.setToken(token)
  projectsService.setToken(token)
}

const PDFForm = () => {
  return null
}

const LoginForm = styled.div`
  display: grid;
`

const MediumEntry = styled.input`
width:100%;

-ms-box-sizing:content-box;
-moz-box-sizing:content-box;
box-sizing:content-box;
-webkit-box-sizing:content-box; 
`

const EditingPage = ({ resumeEntrys, projects }) => {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [errorNotification, setErrorNotification] = useState(null)


  //Checking if cache of logged in user
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNickUser")
    if (loggedUserJSON) {
      setLoggedInUser(JSON.parse(loggedUserJSON))
    }
    const loggedInUser = {
      username: "root",
      name: "ragaraga",
      token: "asdf"
    }
    setLoggedInUser(loggedInUser)
    console.log("Logged in user is: ", loggedInUser)
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      //console.log("(editingPage) Attempting login with ", event.target.username.value)
      const userResponse = await loginService.login(
        { username: event.target.username.value, password: event.target.password.value }
      )
      setLoggedInUser(userResponse)
      setTokens(userResponse.token)
      window.localStorage.setItem("loggedNickUser", JSON.stringify(userResponse))
    }
    catch (exception) {
      //console.error("In editingPage during login, exception thrown: ", exception)
      setErrorNotification("Issue with login")
    }
  }

  //Returns log in page
  if (loggedInUser === null) {
    return (
      <LoginForm>
        <div style={{ placeSelf: "center" }}>
          <h2> LOGIN </h2>
        </div>
        <form onSubmit={handleLogin} style={{ placeSelf: "center", display: "grid", gridTemplateColumns: "1fr 180px", gridTemplateRows: "1fr 1fr 1fr" }}>
          <div>
          username:
          </div>
          <MediumEntry
            type="text"
            name="username"
            id="usernameField"
          />
          <div>
          password:
          </div>
          <MediumEntry
            type="password"
            name="password"
            id="passwordField"
          />
          <button type="submit"> submit </button>
        </form>
      </LoginForm>
    )
  }
  else {        // loggedInUser exists
    return (
      <div>
        <h2> Edit website, {loggedInUser.name} </h2>
        <div>
          <h2> Manage resume entries </h2>
          <ResumeEntrysEditing resumeEntrys={resumeEntrys} user={loggedInUser}/>
        </div>
        <div>
          <h2> Manage projects </h2>
          <ProjectsEditing projects={projects} user={loggedInUser}/>
        </div>
      </div>
    )
  }
}

export default EditingPage