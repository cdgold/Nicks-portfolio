import React, { useState, useEffect } from "react"
import resumeEntrysService from "../services/resumeEntrys"
import styled, { keyframes } from "styled-components"
//import { Document, Page, pdfjs } from "react-pdf"
//pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

/*
  title: String,
  subtitle: String,
  category: String,
  startDate: Date,
  endDate: Date,
  bullets: {
    type: Array,
    "default": []
  }
*/

const fadeIn = keyframes`
  from{
    opacity: 0;
  }
  to {
    opacity: 1;
  }  
`

const slideInLeft = keyframes`
  from{
    margin-left: -100%;
    margin-right: 70%;
  }
  to{
    margin-left: 0%;
    margin-right: 0%;
  }
`

const slideInRight = keyframes`
  from{
    margin-right: -100%;
    margin-left: 100%;
  }
  to{
    margin-right: 0%;
    margin-left: 0%;
  }
`

const slideInFromBottom = keyframes`
  from{
    margin-bottom: -100%;
    margin-top: 100%;
  }
  to{
    margin-bottom: 0%;
    margin-top: 0%;
  }
`

const StyledGrid = styled.section`
  padding: 10px;
  padding-top: 4rem;
  display: grid;
  grid-template-columns: 10% 16% 16% 16% 16% 16% 10%;
  grid-template-rows: 30% 5% 30% 5% 30%;
  overflow: hidden;
  width: 60em;
`

const ResumeBox = styled.div`
  border-radius: 5px; 
  padding-top: 5px;
  padding-bottom: 40px;
  padding-left: 15px;
  padding-right: 10px;
`

const StyledEducationBox = styled(ResumeBox)`
  background-color: ${props => props.theme.colors.eggCream};
  animation: ${fadeIn}, ${slideInLeft};
  grid-column: 1/ span 5;
  grid-row: 1 / 3;
  animation-duration: 1s, 2s;
  z-index: 1;
`

const StyledSkillsBox = styled(ResumeBox)`
  background-color: ${props => props.theme.colors.darkCream};
  text-align: left;
  animation: ${fadeIn}, ${slideInRight};
  grid-column: 4 / span 3;
  grid-row: 2 / 5;
  animation-duration: 2s, 2.5s;
  z-index: 2;
`
const StyledJobsBox = styled(ResumeBox)`
  background-color: ${props => props.theme.colors.lightOrange};
  animation: ${fadeIn}, ${slideInFromBottom};
  grid-column: 3 / span 2;
  grid-row: span 2 / 6;
  animation-duration: 3s, 3s;
  z-index: 3;
`

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
    ]
  },
  {
    title: "Connecticut High",
    category: "education",
    startDate: "8/1/2015",
    endDate: "5/1/2029",
    bullets: [
      "Swimming Nationals Finalist"
    ]
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
    ]
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
    ]
  },
  {
    title: "proficient in powerpoint",
    category: "skill"
  },
  {
    title: "can speak espanol",
    subtitle: "4th level by Congressional Standards",
    category: "skill"
  },
  {
    title: "https://drive.google.com/file/d/1oeOIKZ20WnfBogB3hofXROf33F_5_3Wi/view?usp=sharing",
    category: "pdf"
  }
]

const Resume = ({ resumeEntrys }) => {
  //const [resumeEntrys, setResumeEntrys] = useState([])
  resumeEntrys = exampleResumeEntrys
  //useEffect(() => {
  //  setResumeEntrys(exampleResumeEntrys)
  //}, [])
  /*
  */
  if( resumeEntrys !== [] ) {
    console.log("Resume entrys is: ", resumeEntrys)
    return(
      <div>
        <StyledGrid>
          <StyledEducationBox>
            <h3> education </h3>
            <ul>
              {resumeEntrys.map(entry => {
              //console.log("in components/resume, entry is: ", entry)
              //console.log("category of : ", entry.category, " !== education")
                if (entry.category === "education") {
                  return(<li key={entry.id}> {entry.title} </li>)
                }
              })}
            </ul>
          </StyledEducationBox>
          <StyledSkillsBox>
            <h3> skills </h3>
            {resumeEntrys.map(entry => {
              if (entry.category === "skill"){
                return(<li key={entry.id}> {entry.title} </li>)
              }
            })}
          </StyledSkillsBox>
          <StyledJobsBox>
            <h3> work experience </h3>
            <ol>
              {resumeEntrys.map(entry => {
                if (entry.category === "job"){
                  return(<li key={entry.id}> {entry.title} </li>)
                }
              })}
            </ol>
          </StyledJobsBox>
        </StyledGrid>
      PDF of resume is available <a href={resumeEntrys.find(entry => entry.category === "pdf").title}> here </a> <br></br>
      </div>
    )
  }
  else {
    return ( <div> Loading... </div>)
  }
}

export default Resume