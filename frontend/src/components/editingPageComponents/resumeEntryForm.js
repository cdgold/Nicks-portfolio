import React, { useState, useEffect } from "react"

const ResumeEntryBullet = ({ bullet, index, changeBullet }) => {
  /*const changeBullet = (e) => {
    let newBullets = [...bullets]
    bullets[index] = e.target.value
    setBullets(newBullets)
  }
  */
  return(
    <input name={`bullet${index}`} value={bullet} type="text" onChange={event => changeBullet(index, event)}/>
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
    <form onSubmit={handleSubmit}>
      <div> {"Entry category:"}
        <label><input type="radio" name="category" value="education" defaultChecked={(category === "education") ? true : false}
          onChange={event => handleCategoryChange(event)} /> Education </label>
        <label><input type="radio" name="category" value="skill" defaultChecked={(category === "skill") ? true : false}
          onChange={event => handleCategoryChange(event)} /> Skill </label>
        <label><input type="radio" name="category" value="job" defaultChecked={(category === "job") ? true : false}
          onChange={event => handleCategoryChange(event)}/> Job </label>
      </div>
      <label> {"Title for entry:"}
        <input
          name="title"
          type="text"
          onChange={event => setTitle(event.target.value)}
          value={title}
        >
        </input>
      </label>
      <label> {"Subtitle for entry:"}
        <input
          name="subtitle"
          type="text"
          onChange={event => setSubtitle(event.target.value)}
          value={subtitle}
          disabled = {(category === "skill") ? "disabled" : ""}
        >
        </input>
      </label>
      <label> {"Start date:"}
        <input
          name="startDate"
          type="text"
          onChange={event => setStartDate(event.target.value)}
          value={startDate}
          disabled = {(category === "skill") ? "disabled" : ""}
        >
        </input>
      </label>
      <label> {"End date:"}
        <input
          name="endDate"
          type="text"
          onChange={event => setEndDate(event.target.value)}
          value={endDate}
          disabled = {(category === "skill") ? "disabled" : ""}
        >
        </input>
      </label>
      {bullets.map((bullet, index) => {
        return(<ResumeEntryBullet bullet={bullet} key={index} index={index} changeBullet={changeBullet}/>)
      })}
      <button type="button" onClick={() => increaseBullets()} disabled={(bullets.length === 7) ? true : false } > Add bullet </button>
      <button type="button" onClick={() => decreaseBullets()} disabled={(bullets.length === 0) ? true : false } > Subtract bullet </button>
      <button type="submit" > submit </button>
    </form>
  )
}

export default ResumeEntryCreationForm