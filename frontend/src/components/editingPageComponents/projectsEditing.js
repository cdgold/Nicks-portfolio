/* eslint-disable no-useless-catch */
import React, { useState } from "react"
import projectsService from "../../services/projects"
import ProjectForm from "./projectForm"
import Togglable from "../../utils/togglable"
import styled from "styled-components"

const sampleProjects = [{
  title: "Donn B. Murphy One Act Play",
  description: `A telling story of what it means to be human, how to survive in the wild,
    and believe in yourself.`,
  url: "https://drive.google.com/file/d/1oeOIKZ20WnfBogB3hofXROf33F_5_3Wi/preview",
  writtenOnDate: "December 2020",
  id: "1"
},
{ title: "Donn B. Murphy One Act Play",
  description: `When interviewed about his parody film of Macbeth titled Scotland, PA (2001), writer
    and director Billy Morrisette said he got the idea for the script while working at his local Dairy
    Queen as a teenager. Back then, he told everybody who would listen that the play would be
    hilarious if it “took place in a fast food restaurant and everyone in the restaurant [was] named
    Mac” (Emory). The script, rather than being about an 11th century power struggle over the
    monarchy of Scotland, would focus on a 1970s fast food worker killing the owner of the
    restaurant so he could run it himself. The transformation is inherently funny, yet Morrisette does
    not build this idea much beyond the premise. While Morrisette’s translation of Macbeth into a
    modern rural American town is at times clever, it disappointingly never fully commits to digging
    beyond the surface level of the play. This leaves the film as neither a compelling modern day
    translation of the tragic source material nor as a meaningful satirical take.`,
  url: "https://drive.google.com/file/d/1oeOIKZ20WnfBogB3hofXROf33F_5_3Wi/preview",
  writtenOnDate: "September 2020",
  id: "2" }]

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
