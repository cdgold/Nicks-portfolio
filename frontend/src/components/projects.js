
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import loadingGif from "../assets/loadingAnimations/spinningBalls.gif"

const MAX_HEIGHT = "300px"
const MAX_WIDTH = "600px"
const imageHeight = "50vw"
const imageWidth = "50vw"
const videoHeight = "50vw"
const videoWidth = "28vw"
const pdfHeight = "480px"
const pdfWidth = "640px"

const IFrameDiv = styled.div`
  background:url(${loadingGif}) center center no-repeat;
  width: 100%;
  height: ${props => props.height};
  width: ${props => props.width};
  max-height: ${MAX_HEIGHT};
  max-width: ${MAX_WIDTH};
  grid-column: 1;
  text-align: center;
  place-self: center;
`

const ImageDiv = styled(IFrameDiv)`
  width:600px;
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

const MostRecentProjectDiv = styled.div`
  display: grid;
  grid-template-columns: 80vw;
  grid-template-rows: fit-content(50vw) fit-content(50vw) fit-content(50vw) fit-content(50vw);
  place-content: center;
`

const MostRecentText = styled.div`
  text-align: center;
  grid-column: 1;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 30px;
  font-weight: 400;
  letter-spacing: .3em;
`

const ProjectTitle = styled(MostRecentText)`
  font-size: 30px;
  font-weight: 600;
  letter-spacing: .1em;
`

const MostRecentDate = styled(MostRecentText)`
  font-size: 20px;
  font-weight: 400;
  font-style: italic;
  margin-bottom: 10px;
  letter-spacing: .1em;
`

const MostRecentDescriptionText = styled(MostRecentText)`
font-size: 14px;
font-weight: 400;
margin-top: 10px;
margin-bottom: 10px;
letter-spacing: .1em;
`

const changeIframeDimensions = (setIFrameWidth, setIFrameHeight, fileType) => {
  if(fileType === "PDF"){
    setIFrameHeight(pdfHeight)
    setIFrameWidth(pdfWidth)
  }
  else if(fileType === "image"){
    setIFrameHeight(imageHeight)
    setIFrameWidth(imageWidth)
  }
  else if(fileType === "video"){
    setIFrameHeight(videoHeight)
    setIFrameWidth(videoWidth)
  }
}

const MostRecentProject = ({ project }) => {
  const [IFrameWidth, setIFrameWidth] = useState(null)
  const [IFrameHeight, setIFrameHeight] = useState(null)
  useEffect(() => {
    changeIframeDimensions(setIFrameWidth, setIFrameHeight, project.fileType)
  }, [project])

  if(project !== null){
    return(
      <MostRecentProjectDiv>
        <MostRecentText>{`MOST RECENT`}</MostRecentText>
        <ProjectTitle>{`${project.title}`}</ProjectTitle>
        <MostRecentDate> {`${project.writtenOnDate.toLocaleString("en-us", { month: "long" })} ${project.writtenOnDate.getFullYear()}`} </MostRecentDate>
        <IFrameDiv width={IFrameWidth} height={IFrameHeight} >
          <iframe src={project.fileURL} width={"100%"} height={"100%"} allow="autoplay" ></iframe>
        </IFrameDiv>
        <MostRecentDescriptionText> {project.description} </MostRecentDescriptionText>
      </MostRecentProjectDiv>)
  }
  return null
}

const ProjectsDiv = styled.div`
  width: 100%;
`

const ProjectDiv = styled.div`
  margin-top: 4rem;
  margin-left: 1rem;
  font-family: "Source Sans Pro", sans-serif;
  @media (min-width: 1000px){
    width: 30vw;
  }
  @media (min-width: 750px) and (max-width: 1000px){
    width: 45vw;
  }
  @media (max-width: 750px){
    width: 90vw;
  }
`

const Project = ({ project }) => {
  const [IFrameWidth, setIFrameWidth] = useState(null)
  const [IFrameHeight, setIFrameHeight] = useState(null)
  useEffect(() => {
    changeIframeDimensions(setIFrameWidth, setIFrameHeight, project.fileType)
  }, [project])

  return(
    <ProjectDiv>
      <ProjectTitle> {project.title} </ProjectTitle>
      <h4> {`${project.writtenOnDate.toLocaleString("en-us", { month: "long" })} ${project.writtenOnDate.getFullYear()}`} </h4>
      <p> {project.description} </p>
      {(IFrameWidth !== null && IFrameHeight !== null) ?
        <IFrameDiv style={{ width: "100%", height: IFrameHeight }}>
          <iframe src={project.fileURL} width={"100%"} height={"100%"} allow="autoplay"></iframe>
        </IFrameDiv>
        : null}
    </ProjectDiv>
  )
}

const PreviousProjectsText = styled(MostRecentText)`
  letter-spacing: .2em;
  text-align: left;
  margin-left: 1rem;
`

const PreviousProjectsDiv = styled.div`
  display: flex;
  column-gap: 10px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

const Projects = ({ projects }) => {
  let mostRecentProject = projects.reduce((latestProject, currentProject) => {
    if (latestProject === null || latestProject.writtenOnDate < currentProject.writtenOnDate){
      return currentProject
    }
    return latestProject
  })
  return(
    <ProjectsDiv>
      <MostRecentProject project={mostRecentProject}></MostRecentProject>
      <PreviousProjectsText> Previous Projects </PreviousProjectsText>
      <PreviousProjectsDiv>
        {projects.map((project, index)  => {
          if(project === mostRecentProject){
            return null
          }
          else{
            return(<Project key={project.id} project={project}/>)
          }
        })}
      </PreviousProjectsDiv>
    </ProjectsDiv>
  )
}

export default Projects