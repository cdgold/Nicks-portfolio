import React, { useState } from "react"
import NotificationMessage from "./notificationMessage"

const ProjectForm = ({ project=null, submitFunction }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [fileURL, setFileURL] = useState("")
  const [fileType, setFileType] = useState("none")
  const [writtenOnDate, setWrittenOnDate] = useState(null)
  const [messageColor, setMessageColor] = useState("black")
  const [message, setMessage] = useState("")

  const handleSubmit = async (event) => {
    try {
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
      //const projectResponse = await projectsService.postProject(newProject)
      //console.log("Received ", projectResponse)
      setMessageColor("green")
      setMessage(`Success! ${title} has been posted.`)
      setTimeout(() => {setMessage("")}, 5000)
    }
    catch (error) {
      setMessageColor("red")
      setMessage(`Unknown submission error.`)
      setTimeout(() => {setMessage("")}, 5000)
    }
  }
  return(
    <div>
      <NotificationMessage message={message} setMessage={setMessage} messageColor={messageColor} />
      <form onSubmit={handleSubmit}>
        <label> {"Title of project:"}
          <input
            name="title"
            type="text"
            onChange={event => setTitle(event.target.value)}
          />
        </label>
        <label> {"Date of project:"}
          <input
            name="writtenOnDate"
            type="text"
            onChange={event => setWrittenOnDate(event.target.value)}
          />
        </label>
        <label> {"Description of project:"}
          <textarea
            name="description"
            cols="50"
            rows="10"
            onChange={event => setDescription(event.target.value)}
          >
          </textarea>
        </label>
        <div> {"File type:"}
          <label><input type="radio" name="fileType" value="none" defaultChecked={true} onChange={event => setFileType(event.target.value)}/> None </label>
          <label><input type="radio" name="fileType" value="PDF"  onChange={event => setFileType(event.target.value)} /> PDF </label>
          <label><input type="radio" name="fileType" value="video" onChange={event => setFileType(event.target.value)} /> Video </label>
          <label><input type="radio" name="fileType" value="image" onChange={event => setFileType(event.target.value)}/> Image </label>
        </div>
        <label> {"URL of file (e.g. YouTube link, Google drive embed link)"}
          <input
            name="fileURL"
            type="text"
            onChange={event => setFileURL(event.target.value)}
            disabled = {(fileType === "none") ? "disabled" : ""}
          />
        </label>
        <button type="submit" > submit </button>
      </form>
    </div>
  )
}

export default ProjectForm