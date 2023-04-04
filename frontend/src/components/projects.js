
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import loadingGif from "../assets/loadingAnimations/spinningBalls.gif"

const VideoDiv = styled.div`

`

const PDFDiv = styled.div`
  background:url(${loadingGif}) center center no-repeat;
  width:640px;
  height:480px;
`

const Project = ({ project }) => {
  const [iframeWidth, setIframeWidth] = useState(null)
  const [iframeHeight, setIframeHeight] = useState(null)
  useEffect(() => {

  }, [project])
  return(
    <div>
      <h2> {project.title} </h2>
      <h4> From {project.writtenOnDate} </h4>
      <p> {project.description} </p>
      <PDFDiv>
        <iframe src={project.fileURL} width={"100%"} height={"100%"} allow="autoplay"></iframe>
      </PDFDiv>
    </div>
  )
}

const ProjectsDiv = styled.div`
  margin-top: 4rem;
  margin-left: 1rem;
`

const Projects = ({ projects }) => {
  //projects = sampleProjects
  return(
    <ProjectsDiv>
      {projects.map(project  => {
        return(<Project key={project.id} project={project}/>)
      })}
    </ProjectsDiv>
  )
}

export default Projects