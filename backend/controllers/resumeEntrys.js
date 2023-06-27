const resumeEntrysRouter = require("express").Router()
const ResumeEntry = require("../models/resumeEntry")
const jwt = require("jsonwebtoken")

const acceptableCategories = ["education", "skill", "job", "pdf"]

resumeEntrysRouter.get("/", async (request, response, next) => {
  
    const resumeEntrys = await ResumeEntry
      .find({})
  
    response.json(resumeEntrys)
  })

resumeEntrysRouter.post("/", async (request, response, next) => {
  const body = request.body
  if(!("title" in body) || !("category" in body) || !acceptableCategories.includes(body.category)){
    return response.status(400).end()
  }

  let startDateToSave = undefined
  if (typeof body.startDate !== "undefined"){
    const parsedDate = Date.parse(body.startDate)
    if(!(isNaN(parsedDate))){
      startDateToSave = new Date(parsedDate)
    }
    else {
      startDateToSave = undefined
    }
  }
  
  let endDateToSave = undefined
  if (typeof body.endDate !== "undefined"){
    const parsedDate = Date.parse(body.endDate)
    if(!(isNaN(parsedDate))){
      endDateToSave = new Date(parsedDate)
    }
    else {
      endDateToSave = undefined
    }
  }

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" })
    }
    const resumeEntry = new ResumeEntry({ ...body, "startDate": startDateToSave, "endDate": endDateToSave })
    let oldPdf = null
    if(body.category === "pdf") {
      oldPdf = await ResumeEntry.findOne({ category: "pdf" })
      //console.log("Old pdf is: ", oldPdf)
    }
    const savedResumeEntry = await resumeEntry.save()
    if (oldPdf != null) {
      await oldPdf.deleteOne()
    }

    response.json(savedResumeEntry)
  }
  catch (error) {
    next(error)
  }
})

resumeEntrysRouter.put("/:id", async (request, response, next) => {
  const body = request.body
  if(!("title" in body)){
    return response.status(400).json({
      error: "projects require a title"
    }).end()
  }

  let startDateToSave = undefined
  if (typeof body.startDate !== "undefined"){
    const parsedDate = Date.parse(body.startDate)
    if(!(isNaN(parsedDate))){
      startDateToSave = new Date(parsedDate)
    }
    else {
      startDateToSave = undefined
    }
  }
  
  let endDateToSave = undefined
  if (typeof body.endDate !== "undefined"){
    const parsedDate = Date.parse(body.endDate)
    if(!(isNaN(parsedDate))){
      endDateToSave = new Date(parsedDate)
    }
    else {
      endDateToSave = undefined
    }
  }

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" })
    }
    const newResumeEntry = {
      title: body.title,
      subtitle: body.subtitle,
      category: body.category,
      startDate: startDateToSave,
      endDate: endDateToSave,
      bullets: body.bullets
    }
    const updatedResumeEntry = await ResumeEntry.findByIdAndUpdate(request.params.id, newResumeEntry, { new: true })
    if (updatedResumeEntry == null){
      return response.status(400).json({
        error: "bad id"
      })
    }
    response.json(updatedResumeEntry)
  }
  catch (error) {
    next(error)
  }
})

resumeEntrysRouter.delete("/:id", async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" })
  }
    await ResumeEntry.findByIdAndRemove(request.params.id)
    return response.status(204).end()
})

module.exports = resumeEntrysRouter