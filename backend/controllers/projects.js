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
  console.log("Body is: ", body)
  if(!("title" in body)){
    return response.status(400).json({
      error: "projects require a title"
    }).end()
  }

  try {
    const project = new Project({ ...body })
    if ("fileURL" in body){
      if (!"fileType" in body){
        return response.status(400).json({
          error: "fileType must be included with URL"
        }).end()
      }
    }
    const savedproject = await project.save()
    response.json(savedproject)
  }
  catch (error) {
    next(error)
  }
})

projectsRouter.delete("/:id", async (request, response, next) => {
  try {
    const foundProject = await Project.findById(request.params.id)
    await Project.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  }
  catch(error) {
    next(error)
  }
})

module.exports = projectsRouter