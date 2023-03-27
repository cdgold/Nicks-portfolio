const resumeEntrysRouter = require("express").Router()
const ResumeEntry = require("../models/resumeEntry")
const jwt = require("jsonwebtoken")

resumeEntrysRouter.get("/", async (request, response, next) => {
    const resumeEntrys = await ResumeEntry
      .find({})
  
    response.json(resumeEntrys)
  })

resumeEntrysRouter.post("/", async (request, response, next) => {
  if(!("title" in request.body) || !("category" in request.body)){
    return response.status(400).end()
  }

  const body = request.body
  try {
    const resumeEntry = new ResumeEntry({ ...body })
    const savedResumeEntry = await resumeEntry.save()
    
    response.json(savedResumeEntry)
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