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
  if(!("title" in body) || !("description" in body)){
    return response.status(400).end()
  }

  try {
    const project = new Project({ ...body })
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