import React, { useState, useEffect } from "react"
import Header from "./components/header.js"
import Home from "./components/home.js"
import Footer from "./components/footer.js"
import Resume from "./components/resume.js"
import Projects from "./components/projects.js"
import EditingPage from "./components/editingPage.js"
import resumeEntrysService from "./services/resumeEntrys"
import projectsService from "./services/projects"
import styled from "styled-components"
import {
  Routes, Route
} from "react-router-dom"

// <content="width=device-width, initial-scale=1"> ?
/*
const exampleResumeEntrys = [
  {
    title: "Georgetown University",
    subtitle: "B.A. in Economics",
    category: "education",
    startDate: "8/1/2019",
    endDate: "5/1/2023",
    bullets: [
      "DBMOAF winner",
      "Water Polo captain"
    ],
    id: "01i4keldmsm"
  },
  {
    title: "Connecticut High",
    category: "education",
    startDate: "8/1/2015",
    endDate: "5/1/2029",
    bullets: [
      "Swimming Nationals Finalist"
    ],
    id: "092j3omrkwle"
  },
  {
    title: "Boston Consulting Group",
    subtitle: "Summer Intern",
    category: "job",
    startDate: "5/1/2022",
    endDate: "7/1/2022",
    bullets: [
      "Made the most slide decks",
      "Ate lots of cheese",
      "Got on airplane to texas",
      "Money $20,391 money money wooga"
    ],
    id: "092j3ewd"
  },
  {
    title: "Lorem ipsum",
    subtitle: "winter intern",
    category: "job",
    startDate: "10/1/2022",
    endDate: "12/1/2022",
    bullets: [
      "Made the most slide decks",
      "Ate lots of cheese",
      "Got on airplane to texas",
      "Money $25,391 money money wooga",
      "An extra bullet for contrast"
    ],
    id: "09jaiofdkm"
  },
  {
    title: "proficient in powerpoint",
    category: "skill",
    id: "09j24oqpmwfkle"
  },
  {
    title: "can speak espanol",
    subtitle: "4th level by Congressional Standards",
    category: "skill",
    id: "0pkolc"
  },
  {
    title: "https://drive.google.com/file/d/1oeOIKZ20WnfBogB3hofXROf33F_5_3Wi/view?usp=sharing",
    category: "pdf",
    id: "0i23krowe"
  }
]

const exampleProjects = [{
  title: "Donn B. Murphy One Act Play",
  description: `A telling story of what it means to be human, how to survive in the wild,
    and believe in yourself.`,
  fileURL: "https://www.youtube.com/embed/2TVXi_9Bvlg",
  fileType: "video",
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
  fileURL: "https://drive.google.com/file/d/1oeOIKZ20WnfBogB3hofXROf33F_5_3Wi/preview",
  fileType: "PDF",
  writtenOnDate: "September 2020",
  id: "2" },
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
  fileURL: "https://drive.google.com/file/d/1Nxaf-Zvu1etn-ZLlZUddwhqOPz9UuESG/preview",
  fileType: "image",
  writtenOnDate: "September 2020",
  id: "2" },
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
  fileType: "none",
  writtenOnDate: "September 2020",
  id: "2" }
]
*/
const RoutesDiv = styled.div`
  margin-top: 4rem;
`

const App = () => {

  const [resumeEntrys, setResumeEntrys] = useState([])
  const [projects, setProjects] = useState([])

  useEffect(() => {
    resumeEntrysService.getAll()
      .then(entrys => {
        setResumeEntrys(entrys)
      })
      .catch(error => {
        console.error("Error in resume component when fetching: ", error)
      })
    projectsService.getAll()
      .then(projects => {
        setProjects(projects)
      })
      .catch(error => {
        console.error("Error fetching projects service: ", error)
      })
    //setResumeEntrys(exampleResumeEntrys)
    //setProjects(exampleProjects)
  }, [])

  // checks for subdomain "edit" to return proper page
  if (window.location.host.split(".")[0] === "edit") {
    return(
      <EditingPage resumeEntrys={resumeEntrys} projects={projects}/>
    )
  }
  // else, default landing page
  return(
    <div>
      <Header />
      <RoutesDiv>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/resume"
            element={<Resume resumeEntrys={resumeEntrys} />}
          />
          <Route
            path="/projects"
            element={<Projects projects={projects} />}
          />
        </Routes>
      </RoutesDiv>
      <Footer />
    </div>
  )
}

export default App