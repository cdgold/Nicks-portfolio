import React, { useState, useEffect } from "react"
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
  overflow: hidden;
  width: 100vw;
  font-size: 16px;
`

const ResumeBox = styled.div`
  border-radius: 5px; 
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 1em;
  padding-right: 1em;
  color: white;
  font-family: "Times New Roman", Times, serif;
  font-size: 20px;
`

const StyledEducationBox = styled(ResumeBox)`
  background-color: ${props => props.theme.colors.primary};
  animation: ${fadeIn}, ${slideInLeft};
  grid-column: 1/ span 5;
  grid-row: 1 / 3;
  animation-duration: 1s, 2s;
  z-index: 1;
`

const StyledList = styled.ol`
  list-style: none;
  margin-top: 0px;
`

const StyledSkillsBox = styled(ResumeBox)`
  background-color: ${props => props.theme.colors.secondary};
  text-align: left;
  animation: ${fadeIn}, ${slideInRight};
  grid-column: 4 / span 4;
  margin-right: 20px;
  grid-row: 2 / 5;
  animation-duration: 2s, 2.5s;
  z-index: 2;
`
const StyledJobsBox = styled(ResumeBox)`
  background-color: ${props => props.theme.colors.tertiary};
  animation: ${fadeIn}, ${slideInFromBottom};
  grid-column: 2 / span 5;
  grid-row: span 2 / 6;
  animation-duration: 3s, 3s;
  z-index: 3;
`
const ResumeEntryListing = ({ resumeEntry }) => {
  console.log("Entry is: ", resumeEntry)
  return(
    <li>
      {resumeEntry.title}<br></br>
      <i style={{ fontSize: "90%" }}>{resumeEntry.subtitle}</i>
      {(resumeEntry.bullets !== undefined && resumeEntry.bullets !== []) ? `boola` : null}
    </li>
  )
}

const Resume = ({ resumeEntrys }) => {
  //const [resumeEntrys, setResumeEntrys] = useState([])
  //resumeEntrys = exampleResumeEntrys
  //useEffect(() => {
  //  setResumeEntrys(exampleResumeEntrys)
  //}, [])
  /*
  */

  const calculateGridRowSizes = () => {   //finds appropriate heights for resume categories
    const initialCounts = {
      job: 0,
      education: 0,
      skill: 0
    }
    console.log(resumeEntrys, " is resumeEntrys in gridrowsizes")
    const countsByCategory = resumeEntrys.reduce((counts, entry) => {
      if (entry.category === "education"){
        counts.education = counts.education + 1
      }
      if (entry.category === "skill"){
        counts.skill = counts.skill + 1
      }
      if (entry.category === "job"){
        counts.job = counts.job + 1
      }
      return counts
    }, initialCounts)
    console.log("Final counts is: ", countsByCategory)
    const firstRowSize = (countsByCategory.education*2.5) + 4
    const secondRowSize = (countsByCategory.skill*2) + 4
    const thirdRowSize = (countsByCategory.job*2.5) + 4
    return `${firstRowSize}em 1em ${secondRowSize}em 1em ${thirdRowSize}em`
  }

  if( resumeEntrys !== [] ) {
    return(
      <div>
        <StyledGrid style={{ gridTemplateRows: calculateGridRowSizes() }}>
          <StyledEducationBox>
            <h3 style={{ paddingBottom: "0px", marginBottom: "5px" }}> education </h3>
            <StyledList>
              {resumeEntrys.map(entry => {
              //console.log("in components/resume, entry is: ", entry)
              //console.log("category of : ", entry.category, " !== education")
                if (entry.category === "education") {
                  return(<ResumeEntryListing key={entry.id} resumeEntry={entry} />)
                }
              })}
            </StyledList>
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
            <StyledList>
              {resumeEntrys.map(entry => {
                if (entry.category === "job"){
                  return(<li key={entry.id}> {entry.title} </li>)
                }
              })}
            </StyledList>
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