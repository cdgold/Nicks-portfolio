import React, { useState, useEffect } from "react"
import styled, { keyframes } from "styled-components"
import animations from "../theme/animations"

const SUBTITLE_PERCENT_SIZE = "90"
const BULLET_PERCENT_SIZE = "85"
const BASE_NUMBER_OF_EMS_FOR_RESUME_BOX = 3

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

const slideInLeft = keyframes`
  from{
    transform: translateX(-100%);
  }
  to{
    transform: translateX(0%);
  }
`

const slideInRight = keyframes`
from{
  transform: translateX(100%);
}
to{
  transform: translateX(0%);
}
`

const slideInFromBottom = keyframes`
from{
  transform: translateY(100%);
}
to{
  transform: translateX(0%);
}
`

const StyledGrid = styled.section`
  padding-top: 10px;
  margin-left: 2.5vw;
  margin-right: 2.5vw;
  display: grid;
  grid-template-columns: 15% 14% 14% 14% 14% 14% 15%;
  grid-template-rows: auto-fit, 20em, auto-fit, 5em, auto-fit;
  overflow: hidden;
  width: 95vw;
  min-width: 800px;
  font-size: 20px;
`

const ResumeBox = styled.div`
  border-radius: 5px; 
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 1em;
  padding-right: 1em;
  color: black;
  font-family: "Montserrat", sans-serif;
  font-size: 20px;
  line-height: 120%;
`

const StyledEducationBox = styled(ResumeBox)`
  background-color: ${props => props.theme.colors.primaryLightest};
  animation: ${animations.fadeIn}, ${slideInLeft};
  animation-duration: 2s, 2s;
  will-change: transform, opacity;
  grid-column: 1/ span 5;
  grid-row: 1 / 3;
  z-index: 1;
`

const StyledList = styled.ol`
  list-style: none;
  margin-top: 0px;
`

const StyledSkillsBox = styled(ResumeBox)`
  background-color: ${props => props.theme.colors.primaryLighter};
  text-align: left;
  animation: ${animations.fadeIn}, ${slideInRight};
  animation-duration: 3s, 2.5s;
  will-change: transform, opacity;
  grid-column: 4 / span 5;
  grid-row: 3 / 5;
  z-index: 3;
`

const ResumeHeader = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  margin-bottom: 5px;
  margin-top: 10px;
`

const StyledJobsBox = styled(ResumeBox)`
  background-color: ${props => props.theme.colors.primary};
  animation: ${animations.fadeIn}, ${slideInFromBottom};
  animation-duration: 3.5s, 3s;
  will-change: transform, opacity;
  grid-column: 2 / span 5;
  grid-row: span 1 / 6;
  z-index: 2;
`
const DisplayBullets = ({ bullets }) => {
  if (bullets !== undefined && bullets.length > 0) {
    return(
      <ul>
        {bullets.map((bullet, index) => {
          return(<li key={index} style={{ fontSize: `${BULLET_PERCENT_SIZE}%` }}>{bullet}</li>)
        })}
      </ul>
    )
  }
  return null
}

const ResumeEntryListing = ({ resumeEntry }) => {
  console.log("Entry is: ", resumeEntry)
  return(
    <li>
      {resumeEntry.title} <span style={{ float: "right" }}>
        {(resumeEntry.startDate instanceof Date && resumeEntry.endDate instanceof Date) ?
          `${resumeEntry.startDate.toLocaleString("en-us", { month: "long" })} ${resumeEntry.startDate.getFullYear()} 
          to ${resumeEntry.endDate.toLocaleString("en-us", { month: "long" })} ${resumeEntry.endDate.getFullYear()}`
          : null}
      </span><br></br>
      <i style={{ fontSize: `${SUBTITLE_PERCENT_SIZE}%` }}>{resumeEntry.subtitle}</i>
      <DisplayBullets bullets={resumeEntry.bullets} />
    </li>
  )
}

const PDFDisplay = ({ resumeEntrys }) => {
  const PDFEntry = resumeEntrys.find(entry => entry.category === "pdf")
  if(PDFEntry !== undefined){
    return(
      <div>
        PDF of resume is available <a href={PDFEntry.title}> here </a> <br></br>
      </div>
    )
  }
  return(
    null
  )
}

const Resume = ({ resumeEntrys }) => {
  console.log("resumeEntries is: ", resumeEntrys)
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
        if (entry.bullets !== undefined){
          counts.education = counts.education + (entry.bullets.length * `.${BULLET_PERCENT_SIZE}`)
        }
        if (entry.subtitle !== undefined){
          counts.education = counts.education + (1 * `.${SUBTITLE_PERCENT_SIZE}`)
        }
      }
      if (entry.category === "skill"){
        counts.skill = counts.skill + 1
        if (entry.bullets !== undefined){
          counts.skill = counts.skill + (entry.bullets.length * `.${BULLET_PERCENT_SIZE}`)
        }
      }
      if (entry.category === "job"){
        counts.job = counts.job + 1
        if (entry.bullets !== undefined){
          counts.job = counts.job + (entry.bullets.length * `.${BULLET_PERCENT_SIZE}`)
        }
        if (entry.subtitle !== undefined){
          counts.job = counts.job + (1 * `.${SUBTITLE_PERCENT_SIZE}`)
        }
      }
      return counts
    }, initialCounts)
    console.log("Final counts is: ", countsByCategory)
    const firstRowSize = (countsByCategory.education * 1.1) + BASE_NUMBER_OF_EMS_FOR_RESUME_BOX
    const secondRowSize = (countsByCategory.skill * 1.1) + BASE_NUMBER_OF_EMS_FOR_RESUME_BOX
    const thirdRowSize = (countsByCategory.job * 1.1) + BASE_NUMBER_OF_EMS_FOR_RESUME_BOX
    return `${firstRowSize}em 1em ${secondRowSize}em 1em ${thirdRowSize}em`
  }

  if( resumeEntrys !== []) {
    return(
      <div>
        <StyledGrid style={{ }}>
          <StyledEducationBox>
            <ResumeHeader> Education </ResumeHeader>
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
            <ResumeHeader> Skills </ResumeHeader>
            <StyledList>
              {resumeEntrys.map(entry => {
              //console.log("in components/resume, entry is: ", entry)
              //console.log("category of : ", entry.category, " !== education")
                if (entry.category === "skill") {
                  return(<ResumeEntryListing key={entry.id} resumeEntry={entry} />)
                }
              })}
            </StyledList>
          </StyledSkillsBox>
          <StyledJobsBox>
            <ResumeHeader> Work Experience </ResumeHeader>
            <StyledList>
              {resumeEntrys.map(entry => {
              //console.log("in components/resume, entry is: ", entry)
              //console.log("category of : ", entry.category, " !== education")
                if (entry.category === "job") {
                  return(<ResumeEntryListing key={entry.id} resumeEntry={entry} />)
                }
              })}
            </StyledList>
          </StyledJobsBox>
        </StyledGrid>
        <PDFDisplay resumeEntrys={resumeEntrys}></PDFDisplay>
      </div>
    )
  }
  else {
    return ( <div> Loading... </div>)
  }
}

export default Resume