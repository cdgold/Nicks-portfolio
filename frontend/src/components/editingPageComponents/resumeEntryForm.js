import React, { useState, useEffect } from "react"
import styled from "styled-components"

const ResumeForm = styled.form`
  display: grid;
  grid-template-columns: 10em 20em;
  row-gap: 1px;
`

const EntryText = styled.label`
  place-self: center;
`


const ResumeEntryBullet = ({ bullet, index, changeBullet }) => {
  /*const changeBullet = (e) => {
    let newBullets = [...bullets]
    bullets[index] = e.target.value
    setBullets(newBullets)
  }
  */
  return(
    <div>
      <input style={{ width: "70%" }}
        name={`bullet${index}`}
        value={bullet}
        type="text"
        onChange={event => changeBullet(index, event)}/>
    </div>
  )
}

const ResumeEntryCreationForm = ({ resumeEntry=null, submitFunction }) => {

  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [category, setCategory] = useState("education")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [bullets, setBullets] = useState([])
  const [inputError, setInputError] = useState("")

  useEffect(() => {
    if (resumeEntry !== null){
      setTitle(resumeEntry.title)
      setSubtitle(resumeEntry.subtitle)
      setCategory(resumeEntry.category)
      if (startDate === null){
        setStartDate([""])
      }
      else {
        setStartDate(resumeEntry.startDate)
      }
      if (endDate === null){
        setEndDate([""])
      }
      else {
        setEndDate(resumeEntry.endDate)
      }
      if (bullets === [] || bullets === null){
        setBullets([""])
      }
      else {
        setBullets([resumeEntry.bullets])
      }
    }
  }, [resumeEntry])

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
  }

  const handleSubmit = () => {
    try {
      event.preventDefault()
      if (title === "") {
        setInputError("Resume entries require a title.")
        return
      }
      let formEntry = {
        title: title,
        subtitle: subtitle,
        category: category,
        bullets: bullets
      }
      if (formEntry.category !== "skill") {
        formEntry = { ...formEntry, startDate:startDate, endDate:endDate }
      }
      console.log("Sending formEntry: ", formEntry, " off to editingPage")
      submitFunction(formEntry)
    }
    catch (exception) {
      setInputError("Error on submission attempt.")
    }
  }

  const changeBullet = (index, event) => {
    let newBullets = [...bullets]
    newBullets[index] = event.target.value
    setBullets(newBullets)
  }

  const decreaseBullets = () => {
    const newBullets = [...bullets]
    newBullets.length = bullets.length - 1
    setBullets(newBullets)
  }

  const increaseBullets = async () => {
    const newBullets = bullets.concat("")
    setBullets(newBullets)
  }

  return(
    <ResumeForm onSubmit={handleSubmit}>
      <EntryText style={{ gridColumn: 1, gridRow: 1 }}>
        {"Entry category:"}
      </EntryText>
      <label style={{ gridColumn: 2, gridRow: 1 }}><input
        type="radio"
        name="category"
        value="education"
        defaultChecked={(category === "education") ? true : false}
        onChange={event => handleCategoryChange(event)} /> Education </label>
      <label style={{ gridColumn: 2, gridRow: 2 }}><input
        type="radio"
        name="category"
        value="skill"
        defaultChecked={(category === "skill") ? true : false}
        style={{ gridColumn: 2, gridRow: 2 }}
        onChange={event => handleCategoryChange(event)} /> Skill </label>
      <label style={{ gridColumn: 2, gridRow: 3 }}>
        <input type="radio"
          name="category"
          value="job"
          defaultChecked={(category === "job") ? true : false}
          style={{ gridColumn: 2, gridRow: 3 }}
          onChange={event => handleCategoryChange(event)}/> Job </label>
      <EntryText style={{ gridColumn: 1, gridRow: 4 }}> {"Title for entry:"} </EntryText>
      <div style={{ gridColumn: 1, gridRow: 2 }}></div>
      <div style={{ gridColumn: 1, gridRow: 3 }}></div>  {/* stops bullets from populating empty spaces */}
      <input
        name="title"
        type="text"
        onChange={event => setTitle(event.target.value)}
        value={title}
        style={{ gridColumn: 2, gridRow: 4 }}
      >
      </input>
      <EntryText style={{ gridColumn: 1, gridRow: 5 }}> {`Subtitle for entry:`} </EntryText>
      <input
        name="subtitle"
        type="text"
        style={{ gridColumn: 2, gridRow: 5 }}
        onChange={event => setSubtitle(event.target.value)}
        value={subtitle}
        disabled = {(category === "skill") ? "disabled" : ""}
      >
      </input>
      <EntryText style={{ gridColumn: 1, gridRow: 6 }}> {"Start date:"} </EntryText>
      <input
        name="startDate"
        type="text"
        style={{ gridColumn: 2, gridRow: 6 }}
        onChange={event => setStartDate(event.target.value)}
        value={startDate}
        disabled = {(category === "skill") ? "disabled" : ""}
      >
      </input>
      <EntryText style={{ gridColumn: 1, gridRow: 7 }}> {"End date:"} </EntryText>
      <input
        name="endDate"
        type="text"
        onChange={event => setEndDate(event.target.value)}
        value={endDate}
        style={{ gridColumn: 2, gridRow: 7 }}
        disabled = {(category === "skill") ? "disabled" : ""}
      >
      </input>
      {bullets.map((bullet, index) => {
        return(<div style={{ textAlign: "right", gridColumn: 1, gridRow: 8+index }} key={index}> &bull; </div>)
      })}
      {bullets.map((bullet, index) => {
        return(<ResumeEntryBullet style={{ gridColumn: 2, gridRow: 8+index, width: "100%" }} bullet={bullet} key={index} index={index} changeBullet={changeBullet}/>)
      })}
      <div style={{ gridColumn: 2, gridRow: 8+bullets.length }}>
        <button type="button" onClick={() => increaseBullets()} disabled={(bullets.length === 7) ? true : false } > Add bullet </button>
        <button type="button" onClick={() => decreaseBullets()} disabled={(bullets.length === 0) ? true : false } > Subtract bullet </button>
      </div>
      <button type="submit" style={{ gridColumn: 2, gridRow: 9+bullets.length }} > submit </button>
    </ResumeForm>
  )
}

export default ResumeEntryCreationForm