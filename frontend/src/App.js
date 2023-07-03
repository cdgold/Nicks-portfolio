import React, { useState, useEffect, createContext } from "react"
import Header from "./components/header.js"
import Home from "./components/home.js"
import Footer from "./components/footer.js"
import Resume from "./components/resume.js"
import Projects from "./components/projects.js"
import Blogs from "./components/blogs.js"
import Blog from "./components/blog.js"
import EditingPage from "./components/editingPage.js"
import resumeEntrysService from "./services/resumeEntrys"
import projectsService from "./services/projects"
import blogsService from "./services/blogs"
import styled from "styled-components"
import {
  Routes, Route, useMatch
} from "react-router-dom"
import fonts from "./theme/fonts.css"

// <content="width=device-width, initial-scale=1"> ?
/*
  {
    title: "Georgetown University",
    subtitle: "B.A. in Economics",
    category: "job",
    startDate: new Date("08-01-2019"),
    endDate: new Date("08-01-2019"),
    bullets: [
      "DBMOAF winner",
      "Water Polo captain"
    ],
    id: "022kop3rlmed"
  },
  {
    title: "Georgetown University",
    category: "skill",
    startDate: new Date("08-01-2019"),
    endDate: new Date("08-01-2019"),
    bullets: [
      "DBMOAF winner",
      "Water Polo captain"
    ],
    id: "apojsqowijedf"
  },
  {
    title: "Georgetown University",
    subtitle: "B.A. in Economics",
    category: "education",
    startDate: new Date("08-01-2019"),
    endDate: new Date("08-01-2019"),
    bullets: [
      "DBMOAF winner",
      "Water Polo captain"
    ],
    id: "0ikolasodijfkl3e"
  },
  {
    title: "Georgetown University",
    subtitle: "B.A. in Economics",
    category: "job",
    startDate: new Date("08-01-2019"),
    endDate: new Date("08-01-2019"),
    bullets: [
      "DBMOAF winner",
      "Water Polo captain"
    ],
    id: "022koppowakfe3rlmed"
  },
  {
    title: "Georgetown University",
    category: "skill",
    startDate: new Date("08-01-2019"),
    endDate: new Date("08-01-2019"),
    bullets: [
      "DBMOAF winner",
      "Water Polo captain"
    ],
    id: "apoasdfsdf"
  },
  {
    title: "waopgmsd.org",
    category: "pdf",
    id: "apojsdf"
  },


const dateExample = new Date("2023-05-01T00:00:00.000Z")

const exampleResumeEntrys = [
  {
    title: "Georgetown University",
    subtitle: "B.A. in Economics",
    category: "education",
    startDate: new Date("8/1/2019"),
    endDate: new Date("5/1/2023"),
    bullets: [
      "DBMOAF winner",
      "Water Polo captain"
    ],
    id: "0ikol3e"
  },
  {
    title: "https://drive.google.com/file/d/1oeOIKZ20WnfBogB3hofXROf33F_5_3Wi/view?usp=share_link",
    subtitle: "B.A. in Economics",
    category: "pdf",
    startDate: new Date("8/1/2019"),
    endDate: new Date("5/1/2023"),
    bullets: [
      "DBMOAF winner",
      "Water Polo captain"
    ],
    id: "0iai0jofl3e"
  },
  {
    title: "Georgetown University",
    subtitle: "B.A. in Economics",
    category: "job",
    startDate: new Date("08-01-2019"),
    endDate: new Date("08-01-2019"),
    bullets: [
      "Qui incididunt eiusmod elit quis irure. Qui incididunt eiusmod elit quis irure.",
      "Qui incididunt eiusmod elit quis irure. Qui incididunt eiusmod elit quis irure.",
      "Qui incididunt eiusmod elit quis irure. Qui incididunt eiusmod elit quis irure."
    ],
    id: "022kop3rlmed"
  },
  {
    title: "Georgetown University",
    category: "skill",
    bullets: [
      "Qui incididunt eiusmod elit quis irure. Qui incididunt eiusmod elit quis irure.",
      "Qui incididunt eiusmod elit quis irure. Qui incididunt eiusmod elit quis irure. "
    ],
    id: "apojsqowijedf"
  },
  {
    title: "Georgetown University",
    category: "education",
    startDate: new Date("08-01-2019"),
    endDate: new Date("08-01-2019"),
    bullets: [
      "Qui incididunt eiusmod elit quis irure. Qui incididunt eiusmod elit quis irure.",
      "Qui incididunt eiusmod elit quis irure. Qui incididunt eiusmod elit quis irure."
    ],
    id: "0ikolasodijfkl3e"
  },
  {
    title: "Georgetown University",
    subtitle: "B.A. in Economics",
    category: "job",
    startDate: new Date("08-01-2019"),
    endDate: new Date("08-01-2019"),
    bullets: [
      "DBMOAF winner",
      "Water Polo captain"
    ],
    id: "022koppowakfe3rlmed"
  },
  {
    title: "Georgetown University",
    category: "skill",
    startDate: new Date("08-01-2019"),
    endDate: new Date("08-01-2019"),
    bullets: [
      "DBMOAF winner",
      "Water Polo captain"
    ],
    id: "apoasdfsdf"
  },
  {
    title: "waopgmsd.org",
    category: "pdf",
    id: "apojsdf"
  },
]

const exampleProjects = [{
  title: "Donn B. Murphy One Act Play",
  description: `A telling story of what it means to be human, how to survive in the wild,
    and believe in yourself.`,
  fileURL: "https://www.youtube.com/embed/2TVXi_9Bvlg",
  fileType: "video",
  writtenOnDate: new Date("08-01-2019"),
  id: "afsojpdml"
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
  writtenOnDate: new Date("08-01-2020"),
  id: "askfdoplm" },
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
  writtenOnDate: new Date("08-01-2022"),
  id: "zxpocvml" },
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
  writtenOnDate: new Date("08-01-2018"),
  id: "qweorjlm" }
]

const exampleBlogs = [
  {
    title: "Ullamco nulla reprehenderit deserunt pariatur aute irure.",
    writtenOnDate: new Date("2023-07-01"),
    body: `Anim elit nisi cillum excepteur laboris quis mollit in. Non occaecat aute magna
    eu velit enim sit anim pariatur. Cillum esse pariatur deserunt aute cillum ex veniam duis excepteur.
    Incididunt cillum magna occaecat culpa incididunt ad qui esse ullamco exercitation consectetur dolor velit in.
    Do cupidatat tempor ullamco reprehenderit officia. Pariatur sunt adipisicing esse eu. Qui duis proident labore nisi irure dolor
    tempor occaecat. Anim elit nisi cillum excepteur laboris quis mollit in. Non occaecat aute magna
    eu velit enim sit anim pariatur. Cillum esse pariatur deserunt aute cillum ex veniam duis excepteur.
    Incididunt cillum magna occaecat culpa incididunt ad qui esse ullamco exercitation consectetur dolor velit in.
    Do cupidatat tempor ullamco reprehenderit officia. Pariatur sunt adipisicing esse eu. Qui duis proident labore nisi irure dolor
    tempor occaecat. Anim elit nisi cillum excepteur laboris quis mollit in. Non occaecat aute magna
    eu velit enim sit anim pariatur. Cillum esse pariatur deserunt aute cillum ex veniam duis excepteur.
    Incididunt cillum magna occaecat culpa incididunt ad qui esse ullamco exercitation consectetur dolor velit in.
    Do cupidatat tempor ullamco reprehenderit officia. Pariatur sunt adipisicing esse eu. Qui duis proident labore nisi irure dolor
    tempor occaecat. Anim elit nisi cillum excepteur laboris quis mollit in. Non occaecat aute magna
    eu velit enim sit anim pariatur. Cillum esse pariatur deserunt aute cillum ex veniam duis excepteur.
    Incididunt cillum magna occaecat culpa incididunt ad qui esse ullamco exercitation consectetur dolor velit in.
    Do cupidatat tempor ullamco reprehenderit officia. Pariatur sunt adipisicing esse eu. Qui duis proident labore nisi irure dolor
    tempor occaecat.`,
    id: "09j32oe"
  }
]
*/

const RoutesDiv = styled.div`
  margin-top: 4rem;
`

const App = () => {

  const [resumeEntrys, setResumeEntrys] = useState([])
  const [projects, setProjects] = useState([])
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    resumeEntrysService.getAll()
      .then(entrys => {
        setResumeEntrys(entrys)
      })
      .catch(error => {
        //console.error("Error in resume component when fetching: ", error)
        setResumeEntrys([])
        //setResumeEntrys(exampleResumeEntrys)
      })
    projectsService.getAll()
      .then(projects => {
        setProjects(projects)
      })
      .catch(error => {
        //console.error("Error fetching projects service: ", error)
        setProjects([])
        //setProjects(exampleProjects)
      })
    blogsService.getAll()
      .then(blogs => {
        setBlogs(blogs)
      })
      .catch(error => {
        //console.error("Error fetching blogs service: ", error)
        setBlogs([])
      })

    //setResumeEntrys(exampleResumeEntrys)
    //setBlogs(exampleBlogs)

  }, [])

  const blogMatch = useMatch("/blogs/:id")
  const viewedBlog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  //console.log("Viewed blog is: ", viewedBlog)

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
            element={<Projects
              projects={projects}
            />}
          />
          <Route
            path="/blogs"
            element={<Blogs blogs={blogs} />}
          />
          < Route
            path="blogs/:id" element={<Blog blog={viewedBlog} />}
          />
          < Route
            path="/edit" element={<EditingPage
              resumeEntrys={resumeEntrys}
              projects={projects}
              blogs={blogs}
              setProjects={setProjects}
              setBlogs={setBlogs}
              setResumeEntrys={setResumeEntrys}
            />}
          />
        </Routes>
      </RoutesDiv>
      <Footer />
    </div>
  )
}

export default App