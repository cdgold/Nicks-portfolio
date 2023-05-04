
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
  grid-template-columns: minmax(5px, 10vw) minmax(650px, 80vw) minmax(5px, 10vw);
  grid-template-rows: fit-content(50vw) fit-content(50vw) fit-content(50vw) fit-content(50vw);
  place-content: center;
`

const MostRecentText = styled.div`
  text-align: center;
  grid-column: 2;
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
        <IFrameDiv style={{ height: IFrameWidth, gridColumn: "2", textAlign: "center", placeContent: "center" }}>
          <iframe src={project.fileURL} width={IFrameWidth} height={"100%"} allow="autoplay" ></iframe>
        </IFrameDiv>
        <MostRecentDescriptionText> {project.description} </MostRecentDescriptionText>
      </MostRecentProjectDiv>)
  }
  return null
}

const ProjectDiv = styled.div`
  width: 650px;
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
        <IFrameDiv style={{ width: IFrameHeight, height: IFrameWidth }}>
          <iframe src={project.fileURL} width={"100%"} height={"100%"} allow="autoplay"></iframe>
        </IFrameDiv>
        : null}
    </ProjectDiv>
  )
}

const ProjectsDiv = styled.div`
  margin-top: 4rem;
  margin-left: 1rem;
  font-family: "Source Sans Pro", sans-serif;
`

const PreviousProjectsText = styled(MostRecentText)`
  letter-spacing: .2em;
  text-align: left;
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
          if ((projects.length - 1) !== index){
            console.log(`${projects.length} is length with index ${index}`)
            return(<div key={project.id}><Project project={project}/> <hr></hr></div>)
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