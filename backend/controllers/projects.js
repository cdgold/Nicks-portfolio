const projectsRouter = require("express").Router()
const Project = require("../models/project")
const jwt = require("jsonwebtoken")


projectsRouter.get("/", async (request, response, next) => {
    const projects = await Project
      .find({})
  
    response.json(projects)
  })

projectsRouter.post("/", async (request, response, next) => {
  const body = request.body
  if(!("title" in body)){
    return response.status(400).json({
      error: "projects require a title"
    }).end()
  }

  if ("fileURL" in body){
    if (!"fileType" in body){
      return response.status(400).json({
        error: "fileType must be included with URL"
      }).end()
    }
  }

  let dateToSave
  if (typeof body.writtenOnDate !== "undefined"){
    const parsedDate = Date.parse(body.writtenOnDate)
    if(!(isNaN(parsedDate))){
      dateToSave = new Date(parsedDate)
    }
    else {
      dateToSave = undefined
    }
  }

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" })
    }
    const project = new Project({ ...body, "writtenOnDate": dateToSave })
    const savedproject = await project.save()
    response.json(savedproject)
  }
  catch (error) {
    next(error)
  }
})

projectsRouter.put("/:id", async (request, response, next) => {
  const body = request.body
  if(!("title" in body)){
    return response.status(400).json({
      error: "projects require a title"
    }).end()
  }
  if ("fileURL" in body){
    if (!"fileType" in body){
      return response.status(400).json({
        error: "fileType must be included with URL"
      }).end()
    }
  }

  let dateToSave
  if (typeof body.writtenOnDate !== "undefined"){
    const parsedDate = Date.parse(body.writtenOnDate)
    if(!(isNaN(parsedDate))){
      dateToSave = new Date(parsedDate)
    }
    else {
      dateToSave = undefined
    }
  }

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" })
    }
    const newProject = {
      title: body.title,
      description: body.description,
      fileURL: body.fileURL,
      fileType: body.fileType,
      writtenOnDate: dateToSave
    }
      const updatedProject = await Project.findByIdAndUpdate(request.params.id, newProject, { new: true })
      if (updatedProject == null){
        return response.status(400).json({
          error: "bad id"
        })
      }
    response.json(updatedProject)
  }
  catch (error) {
    next(error)
  }
})

projectsRouter.delete("/:id", async (request, response, next) => {
  try {
    console.log("Token is: ", request.token)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" })
    }
    const foundProject = await Project.findById(request.params.id)
    await Project.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  }
  catch(error) {
    next(error)
  }
})

module.exports = projectsRouter