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

  try {
    const resumeEntry = new ResumeEntry({ ...body })
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

  try {
    const newResumeEntry = {
      title: body.title,
      subtitle: body.subtitle,
      category: body.category,
      startDate: body.startDate,
      endDate: body.endDate,
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
  try {
    const foundResumeEntry = await ResumeEntry.findById(request.params.id)
    await ResumeEntry.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  }
  catch(error) {
    next(error)
  }
})

module.exports = resumeEntrysRouter