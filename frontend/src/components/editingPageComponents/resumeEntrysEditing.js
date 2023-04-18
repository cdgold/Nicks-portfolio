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
  padding-right: 20px;
`

const ResumeEntrysEditingDiv = styled.div`
  width: 30em;
  margin-left: 10px;
`

const ResumeEntry = ({ resumeEntry }) => {
  const [editMode, setEditMode] = useState(false)

  const reviseResumeEntry = async (newResumeEntry) => {
    newResumeEntry = { ...newResumeEntry, id:resumeEntry.id }
    return await resumeEntrysService.putEntry(newResumeEntry)
  }

  const deleteResumeEntry = async () => {
    console.log("resumeEntry is:", resumeEntry)
    return await resumeEntrysService.deleteEntry(resumeEntry)
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

  const handleResumeCreation= async (newResume) => {
    try{
      return await resumeEntrysService.postProject(newResume)
    }
    catch (error){
      throw(error)
    }
  }

  if(resumeEntrys !== null){
    return(
      <ResumeEntrysEditingDiv>
        <ResumeEntryForm submitFunction={handleResumeCreation}/>
        {resumeEntrys.map(entry => <ResumeEntry key={entry.id} resumeEntry={entry}/>)}
      </ResumeEntrysEditingDiv>
    )
  }
  return(
    <ResumeEntrysEditingDiv>
      <ResumeEntryForm submitFunction={handleResumeCreation}/>
    </ResumeEntrysEditingDiv>
  )
}

export default ResumeEntrysEditing
