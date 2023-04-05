/* eslint-disable no-useless-catch */
import React, { useState } from "react"
import resumeEntrysService from "../../services/resumeEntrys"
import ResumeEntryForm from "./resumeEntryForm"
import Togglable from "../../utils/togglable"
import styled from "styled-components"

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
