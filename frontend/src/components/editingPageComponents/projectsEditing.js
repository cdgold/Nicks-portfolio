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


const ProjectsEditingDiv = styled.div`
  width: 30em;
`

const ProjectDiv = styled.div`
  border-width: thin;
  border: solid;
  margin-bottom: 5px;
`

const Project = ({ project, deleteProject }) => {
  const [editMode, setEditMode] = useState(false)

  const reviseProject = async (newProject) => {
    newProject = { ...newProject, id:project.id }
    return await projectsService.putProject(newProject)
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
            Project created on: {project.writtenOnDate.toDateString()} <br></br>
          </div>
          <button onClick={() => setEditMode(!editMode)}> edit this project </button>
          <button onClick={() => deleteProject(project)}> delete this project </button>
          <br></br>
        </Togglable>
      </ProjectDiv>
    )
  }
  else {       // edit mode is true
    return(
      <ProjectDiv>
        <ProjectForm project={project} submitFunction={reviseProject} />
        <button onClick={() => setEditMode(!editMode)}> stop editing and discard changes </button>
      </ProjectDiv>
    )
  }

}

const ProjectsEditing = ({ projects, setProjects }) => {
  //projects = sampleProjects

  const deleteProject = async (project) => {
    try{
      await projectsService.deleteProject(project)
      const newProjects = projects.filter(entry => project.id !== entry.id)
      setProjects(newProjects)
    }
    catch (error) {
      window.alert("Error while deleting project!")
    }
  }

  const handleProjectCreation= async (newProject) => {
    try{
      const postResponse = await projectsService.postProject(newProject)
      console.log("Postresponse is: ", postResponse)
      return postResponse
    }
    catch (error){
      throw(error)
    }
  }
  if(projects !== null){
    return(
      <ProjectsEditingDiv>
        <ProjectForm submitFunction={handleProjectCreation}/>
        {projects.map(project => <Project key={project.id} project={project} deleteProject={deleteProject}/>)}
      </ProjectsEditingDiv>
    )
  }
  return(
    <ProjectsEditingDiv>
      <ProjectForm submitFunction={handleProjectCreation}/>
    </ProjectsEditingDiv>
  )
}

export default ProjectsEditing
