/* eslint-disable no-useless-catch */
import React, { useState } from "react"
import projectsService from "../../services/projects"
import ProjectForm from "./projectForm"
import Togglable from "../../utils/togglable"
import styled from "styled-components"
/*
  title: String,
  description: String,
  fileURL: String,
  fileType: String,
  writtenOnDate: Date
  */

const ProjectDiv = styled.div`
  border-width: thin;
  border: solid;
  margin-bottom: 5px;
`

const Project = ({ project }) => {
  const [editMode, setEditMode] = useState(false)

  const reviseProject = (newProject) => {
    newProject = { ...newProject, id:project.id }
    projectsService.putProject(newProject)
  }

  const deleteProject = () => {
    projectsService.deleteProject(project)
  }

  if (editMode === false){
    return(
      <ProjectDiv>
        {`${project.title}`}
        <Togglable>
          <p>
            {project.description}
          </p>
          <div>
            URL of project file: {project.fileURL} <br></br>
            Kind of project media: {project.fileType} <br></br>
            Project created on: {project.writtenOnDate} <br></br>
          </div>
          <button onClick={() => setEditMode(!editMode)}> edit this project </button>
          <button onClick={() => deleteProject()}> delete this project </button>
          <br></br>
        </Togglable>
      </ProjectDiv>
    )
  }
  else {       // edit mode is true
    return(
      <ProjectDiv>
        <ProjectForm project={project} submitFunction={reviseProject} />
        <button onClick={() => setEditMode(!editMode)}> stop editing this project </button>
      </ProjectDiv>
    )
  }

}

const ProjectsEditing = ({ projects }) => {
  //projects = sampleProjects

  const handleProjectCreation= (newProject) => {
    try{
      projectsService.postProject(newProject)
    }
    catch (error){
      throw(error)
    }
  }
  if(projects !== null){
    return(
      <div>
        <ProjectForm submitFunction={handleProjectCreation}/>
        {projects.map(project => <Project key={project.id} project={project}/>)}
      </div>
    )
  }
  return(
    <div>
      <ProjectForm submitFunction={handleProjectCreation}/>
    </div>
  )
}

export default ProjectsEditing
