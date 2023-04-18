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
  padding: 10px;
  display: grid;
  grid-template-columns: 10% 16% 16% 16% 16% 16% 10%;
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
  color: white;
  font-family: "Times New Roman", Times, serif;
  font-size: 20px;
  line-height: 100%;
`

const StyledEducationBox = styled(ResumeBox)`
  background-color: ${props => props.theme.colors.primary};
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
  background-color: ${props => props.theme.colors.secondary};
  text-align: left;
  animation: ${animations.fadeIn}, ${slideInRight};
  animation-duration: 3s, 2.5s;
  will-change: transform, opacity;
  grid-column: 4 / span 4;
  margin-right: 20px;
  grid-row: 2 / 5;
  z-index: 3;
`
const StyledJobsBox = styled(ResumeBox)`
  background-color: ${props => props.theme.colors.tertiary};
  animation: ${animations.fadeIn}, ${slideInFromBottom};
  animation-duration: 3.5s, 3s;
  will-change: transform, opacity;
  grid-column: 2 / span 5;
  grid-row: span 2 / 6;
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
        {(resumeEntry.startDate !== undefined && resumeEntry.endDate !== undefined) ? `${resumeEntry.startDate} to ${resumeEntry.endDate}` : null}
      </span><br></br>
      <i style={{ fontSize: `${SUBTITLE_PERCENT_SIZE}%` }}>{resumeEntry.subtitle}</i>
      <DisplayBullets bullets={resumeEntry.bullets} />
    </li>
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

  if( resumeEntrys !== [] && resumeEntrys.find(entry => entry.category === "pdf").title !== undefined) {
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
            <h3 style={{ paddingBottom: "0px", marginBottom: "5px" }}> skills </h3>
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
            <h3 style={{ paddingBottom: "0px", marginBottom: "5px" }}> work experience </h3>
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
      PDF of resume is available <a href={resumeEntrys.find(entry => entry.category === "pdf").title}> here </a> <br></br>
      </div>
    )
  }
  else {
    return ( <div> Loading... </div>)
  }
}

export default Resume