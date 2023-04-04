/* eslint-disable no-useless-catch */
import React, { useState } from "react"
import resumeEntrysService from "../../services/resumeEntrys"
import ResumeEntryForm from "./resumeEntryForm"
import Togglable from "../../utils/togglable"
import styled from "styled-components"

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

const ResumeEntryDiv = styled.div`
  border-width: thin;
  border: solid;
  margin-bottom: 5px;
`

const ResumeEntry = ({ resumeEntry }) => {
  const [editMode, setEditMode] = useState(false)

  const reviseResumeEntry = (newResumeEntry) => {
    newResumeEntry = { ...newResumeEntry, id:resumeEntry.id }
    resumeEntrysService.putEntry(newResumeEntry)
  }

  const deleteResumeEntry = () => {
    console.log("resumeEntry is:", resumeEntry)
    resumeEntrysService.deleteEntry(resumeEntry)
  }

  if (editMode === false){
    return(
      <ResumeEntryDiv>
        {`${resumeEntry.title}`}
        <Togglable>
          <div>
            Subtitle of resume entry: {resumeEntry.subtitle} <br></br>
            Category of entry: {resumeEntry.category} <br></br>
            Start date: {(resumeEntry.startDate !== undefined) ? resumeEntry.startDate : `No date stored`} <br></br>
            End date: {(resumeEntry.endDate !== undefined) ? resumeEntry.endDate : `No date stored`} <br></br>
            Bullets: {(resumeEntry.bullets !== undefined) ? resumeEntry.bullets.map((bullet, index) => {
              return(<li key={index}> {bullet} </li>)
            }) : `[No bullets]`}
          </div>
          <button onClick={() => setEditMode(!editMode)}> edit this entry </button>
          <button onClick={() => deleteResumeEntry()}> delete this entry </button>
          <br></br>
        </Togglable>
      </ResumeEntryDiv>
    )
  }
  else {       // edit mode is true
    return(
      <ResumeEntryDiv>
        <ResumeEntryForm resumeEntry={resumeEntry} submitFunction={reviseResumeEntry} />
        <button onClick={() => setEditMode(!editMode)}> stop editing this entry </button>
      </ResumeEntryDiv>
    )
  }

}

const ResumeEntrysEditing = ({ resumeEntrys }) => {
  //resumeEntrys = exampleResumeEntrys
  console.log("resumeEntrys is: ", resumeEntrys)

  const handleResumeCreation= (newResume) => {
    try{
      resumeEntrysService.postProject(newResume)
    }
    catch (error){
      throw(error)
    }
  }

  if(resumeEntrys !== null){
    return(
      <div>
        <ResumeEntryForm submitFunction={handleResumeCreation}/>
        {resumeEntrys.map(entry => <ResumeEntry key={entry.id} resumeEntry={entry}/>)}
      </div>
    )
  }
  return(
    <div>
      <ResumeEntryForm submitFunction={handleResumeCreation}/>
    </div>
  )
}

export default ResumeEntrysEditing
