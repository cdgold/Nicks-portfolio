
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import loadingGif from "../assets/loadingAnimations/spinningBalls.gif"

const imageHeight = "400px"
const imageWidth = "400px"
const videoHeight = "560px"
const videoWidth = "315px"
const pdfHeight = "480px"
const pdfWidth = "640px"

const IFrameDiv = styled.div`
background:url(${loadingGif}) center center no-repeat;
`

const ImageDiv = styled(IFrameDiv)`
  width:400px;
  height:400px;
`

const VideoDiv = styled(IFrameDiv)`
  width:560px;
  height:315px;
`

const PDFDiv = styled(IFrameDiv)`
  width:640px;
  height:480px;
`

const Project = ({ project }) => {
  const [IFrameWidth, setIFrameWidth] = useState(null)
  const [IFrameHeight, setIFrameHeight] = useState(null)
  useEffect(() => {
    if(project.fileType === "PDF"){
      setIFrameHeight(pdfHeight)
      setIFrameWidth(pdfWidth)
    }
    else if(project.fileType === "image"){
      setIFrameHeight(imageHeight)
      setIFrameWidth(imageWidth)
    }
    else if(project.fileType === "video"){
      setIFrameHeight(videoHeight)
      setIFrameWidth(videoWidth)
    }
  }, [project])

  if (IFrameWidth !== null && IFrameHeight !== null){
    return(
      <div>
        <h2> {project.title} </h2>
        <h4> From {project.writtenOnDate} </h4>
        <p> {project.description} </p>
        <IFrameDiv style={{ width: IFrameHeight, height: IFrameWidth }}>
          <iframe src={project.fileURL} width={"100%"} height={"100%"} allow="autoplay"></iframe>
        </IFrameDiv>
      </div>
    )
  }
  else{
    return(
      <div>
        <h2> {project.title} </h2>
        <h4> From {project.writtenOnDate} </h4>
        <p> {project.description} </p>
      </div>
    )
  }
}

const ProjectsDiv = styled.div`
  margin-top: 4rem;
  margin-left: 1rem;
`

const Projects = ({ projects }) => {
  console.log("rpojects is: ", projects)
  return(
    <ProjectsDiv>
      {projects.map((project, index)  => {
        if ((projects.length - 1) !== index){
          console.log(`${projects.length} is length with index ${index}`)
          return(<div key={project.id}><Project project={project}/> <hr></hr></div>)
        }
        else{
          return(<Project key={project.id} project={project}/>)
        }
      })}
    </ProjectsDiv>
  )
}

export default Projects