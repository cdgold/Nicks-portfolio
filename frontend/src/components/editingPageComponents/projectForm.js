import React, { useState, useEffect } from "react"
import NotificationMessage from "./notificationMessage"
import styled from "styled-components"

const EntryText = styled.label`
place-self: center;
`

const EntryInput = styled.input`

`

const ProjectFormDiv = styled.form`
display: grid;
grid-template-columns: 10em 20em;
row-gap: 1px;
`

const ProjectForm = ({ project=null, submitFunction }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [fileURL, setFileURL] = useState("")
  const [fileType, setFileType] = useState("none")
  const [writtenOnDate, setWrittenOnDate] = useState("")
  const [messageColor, setMessageColor] = useState("black")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if(project !== null){
      setTitle(project.title)
      setDescription(project.description)
      setFileURL(project.fileURL)
      setFileType(project.fileType)
      setWrittenOnDate(project.writtenOnDate)
    }
  }, [project])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (title === "") {
      setMessageColor("red")
      setMessage("Projects require a title.")
      return
    }
    let newProject = {
      title: title,
      description: description,
      writtenOnDate: writtenOnDate
    }
    console.log("File type is: ", fileType)
    if (event.fileType !== "none"){
      newProject = { ...newProject, fileType: fileType, fileURL: fileURL }
    }
    //console.log("Sending project: ", newProject, " off to projectService")
    submitFunction(newProject)
      .then(submitResponse => {
        setMessageColor("green")
        setMessage(`Success! ${title} has been submitted.`)
        setTimeout(() => {setMessage("")}, 5000)
      })
      .catch((error) => {
        setMessageColor("red")
        setMessage(`Unknown submission error.`)
        setTimeout(() => {setMessage("")}, 5000)
      })
  }
  return(
    <div>
      <NotificationMessage message={message} setMessage={setMessage} messageColor={messageColor} />
      <ProjectFormDiv onSubmit={handleSubmit}>
        <EntryText style={{ gridColumn: 1, gridRow: 1 }}> {"Title of project:"}         </EntryText>
        <input
          name="title"
          type="text"
          style={{ gridColumn: 2, gridRow: 1 }}
          onChange={event => setTitle(event.target.value)}
          value={title}
        />
        <EntryText style={{ gridColumn: 1, gridRow: 2 }}> {"Date of project:"} </EntryText>
        <input
          name="writtenOnDate"
          type="text"
          style={{ gridColumn: 2, gridRow: 2 }}
          onChange={event => setWrittenOnDate(event.target.value)}
          value={writtenOnDate}
        />
        <EntryText style={{ gridColumn: 1, gridRow: 3 }}> {"Description of project:"} </EntryText>
        <textarea
          name="description"
          cols="50"
          rows="10"
          style={{ gridColumn: 2, gridRow: 3, resize: "none", width: "100%", height: "10em" }}
          onChange={event => setDescription(event.target.value)}
          value={description}
        >
        </textarea>

        <EntryText style={{ gridColumn: 1, gridRow: 4 }}> {"File type:"} </EntryText>
        <label style={{ gridColumn: 2, gridRow: 4 }}><input type="radio" name="fileType" value="none"
          onChange={event => setFileType(event.target.value)}
          checked={fileType==="none"} /> None </label>
        <label style={{ gridColumn: 2, gridRow: 5 }}><input type="radio" name="fileType" value="PDF"
          onChange={event => setFileType(event.target.value)} checked={fileType==="PDF"} /> PDF </label>
        <label style={{ gridColumn: 2, gridRow: 6 }}><input type="radio" name="fileType" value="video"
          onChange={event => setFileType(event.target.value)} checked={fileType==="video"} /> Video </label>
        <label style={{ gridColumn: 2, gridRow: 7 }}><input type="radio" name="fileType" value="image"
          onChange={event => setFileType(event.target.value)} checked={fileType==="image"} /> Image </label>
        <EntryText style={{ gridColumn: 1, gridRow: 8 }}>
          {fileType === "none" ? null : "URL of file (e.g. YouTube link, Google drive embed link):"}
        </EntryText>
        <input
          name="fileURL"
          type="text"
          onChange={event => setFileURL(event.target.value)}
          style={{ gridColumn: 2, gridRow: 8, height: "1em", width: "100%", placeSelf: "center" }}
          disabled = {(fileType === "none") ? "disabled" : ""}
        />
        <button type="submit" style={{ gridColumn: 2, gridRow: fileType === "none" ? 8 : 9 }}> submit </button>
      </ProjectFormDiv>
    </div>
  )
}

export default ProjectForm