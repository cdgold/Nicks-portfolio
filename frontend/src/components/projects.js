
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import loadingGif from "../assets/loadingAnimations/spinningBalls.gif"

const MAX_HEIGHT = "500px"
const MAX_WIDTH = "600px"
const imageHeight = "50vh"
const videoHeight = "50vh"
const pdfHeight = "70vh"

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
  place-content: center;
`

const MostRecentProjectContainer = styled.div`
background: ${props => props.theme.colors.primary};
border-radius: 10px;
  width: 100%;
  display: grid;
  @media (min-width: 700px){
    padding: 20px;
    grid-template-rows: fit-content(80vw) fit-content(80vw) fit-content(80vw) fit-content(80vw);
  }
  @media (max-width: 700px){
    grid-template-rows: fit-content(50vw) fit-content(50vw) fit-content(50vw) fit-content(50vw);
  }
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
  color: white;
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
    setIFrameWidth("100%")
  }
  else if(fileType === "image"){
    setIFrameHeight(imageHeight)
    setIFrameWidth("100%")
  }
  else if(fileType === "video"){
    setIFrameHeight(videoHeight)
    setIFrameWidth("100%")
  }
}

const MostRecentProject = ({ project }) => {
  const [IFrameWidth, setIFrameWidth] = useState(null)
  const [IFrameHeight, setIFrameHeight] = useState(null)
  useEffect(() => {
    if(project !== null && typeof project.fileType !== "undefined" && project.fileType !== null){
      changeIframeDimensions(setIFrameWidth, setIFrameHeight, project.fileType)
    }
  }, [project])

  if(project !== null){
    return(
      <MostRecentProjectDiv>
        <MostRecentProjectContainer>
          <span style={{ color: "white" }}>
            <MostRecentText>{`MOST RECENT`}</MostRecentText>
            <ProjectTitle>{`${project.title}`}</ProjectTitle>
            {(typeof project.writtenOnDate !== "undefined" && project.writtenOnDate !== null)?
              <MostRecentDate> {`${project.writtenOnDate.toLocaleString("en-us", { month: "long" })} ${project.writtenOnDate.getFullYear()}`} </MostRecentDate>
              :null}
          </span>
          {(IFrameHeight !== null && IFrameWidth !== null)?
            <IFrameDiv width={"90%"} height={IFrameHeight} >
              <iframe src={project.fileURL} width={"100%"} height={"100%"} allow="autoplay" ></iframe>
            </IFrameDiv>
            :null}
          <MostRecentDescriptionText> {project.description} </MostRecentDescriptionText>
        </MostRecentProjectContainer>
      </MostRecentProjectDiv>)
  }
  return null
}

const ProjectsDiv = styled.div`
  width: 100%;
`

const ProjectDiv = styled.div`
  margin-top: 2rem;
  margin-left: 1rem;
  background: ${props => props.theme.colors.primary};
  border-radius: 10px;
  font-family: "Source Sans Pro", sans-serif;
  height: min-content;
  @media (min-width: 1000px){
    width: 40vw;
    padding: 20px;
  }
  @media (min-width: 750px) and (max-width: 1000px){
    width: 45vw;
    padding: 10px;
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
      <ProjectTitle style={{ textAlign: "left" }}> {project.title} </ProjectTitle>
      <span style={{ color: "white" }}>
        {(typeof project.writtenOnDate !== "undefined")?
          <h4> {`${project.writtenOnDate.toLocaleString("en-us", { month: "long" })} ${project.writtenOnDate.getFullYear()}`} </h4>
          :null}
      </span>
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
  margin-top: 3rem;
  letter-spacing: .2em;
  text-align: left;
  margin-left: 1rem;

`

const PreviousProjectsDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
`

const Projects = ({ projects }) => {
  const [mostRecentProject, setMostRecentProject] = useState(null)

  useEffect(() => {
    if (projects !== null && (Array.isArray(projects) && projects.length > 0)){
      let newMostRecentProject = projects.reduce((latestProject, currentProject) => {
        if (latestProject === null || latestProject.writtenOnDate < currentProject.writtenOnDate){
          return currentProject
        }
        return latestProject
      }, null)
      setMostRecentProject(newMostRecentProject)
    }
  }, [projects])

  if (Array.isArray(projects) && projects.length > 0){
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
  return (
    <div>
          Could not retrieve projects.
    </div>
  )
}

export default Projects