
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import loadingGif from "../assets/loadingAnimations/spinningBalls.gif"

const sampleProjects = [{
  title: "Donn B. Murphy One Act Play",
  description: `A telling story of what it means to be human, how to survive in the wild,
  and believe in yourself.`,
  url: "https://drive.google.com/file/d/1oeOIKZ20WnfBogB3hofXROf33F_5_3Wi/preview",
  writtenOnDate: "December 2020"
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
  writtenOnDate: "September 2020" }]

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
      {projects.map((project, index)  => {
        console.log("Project is: ", project)
        return(<Project key={project.id} project={project}/>)
      })}
    </ProjectsDiv>
  )
}

export default Projects