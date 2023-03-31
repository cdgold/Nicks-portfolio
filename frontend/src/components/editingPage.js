import React, { useState, useEffect } from "react"
import loginService from "../services/login"
import ResumeEntryCreationForm from "./editingPageComponents/resumeEntryCreationForm"
import resumeEntrysService from "../services/resumeEntrys"

const PDFForm = () => {
  return null
}

const EditingPage = ({ resumeEntrys, projects }) => {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [errorNotification, setErrorNotification] = useState(null)


  //Checking if cache of logged in user
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNickUser")
    if (loggedUserJSON) {
      setLoggedInUser(JSON.parse(loggedUserJSON))
    }
    const loggedUser = {
      name: "Bill Withers",
      username: "bill",
      token: "asdf"
    }
    setLoggedInUser(loggedUser)
    resumeEntrysService.setToken(loggedUser.token)
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      //console.log("(editingPage) Attempting login with ", event.target.username.value)
      const userResponse = await loginService.login(
        { username: event.target.username.value, password: event.target.password.value }
      )
      setLoggedInUser(userResponse)
      resumeEntrysService.setToken(userResponse.token)
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
      <div>
        <h2> Login </h2>
        <form onSubmit={handleLogin}>
          <div>
          username:
            <input
              type="text"
              name="username"
              id="usernameField"
            />
          </div>
          <div>
            password:
            <input
              type="text"
              name="password"
              id="passwordField"
            />
          </div>
          <button type="submit"> submit </button>
        </form>
      </div>
    )
  }
  else {        // loggedInUser exists
    return (
      <div>
        <h2> Edit website, {loggedInUser.name} </h2>
        <div>
          <h2> Manage resume entries </h2>
          <ResumeEntryCreationForm resumeEntrys={resumeEntrys} user={loggedInUser}/>
        </div>
        <div>
          <h2> Manage projects </h2>
        </div>
      </div>
    )
  }
}

export default EditingPage