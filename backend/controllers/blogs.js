const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const jwt = require("jsonwebtoken")

blogsRouter.get("/", async (request, response, next) => {
    const blogs = await Blog
      .find({})
  
    response.json(blogs)
  })

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body
  if(!("title" in body)){
    return response.status(400).json({
      error: "blogs require a title"
    }).end()
  }
  if(!("writtenOnDate" in body)){
    return response.status(400).json({
      error: "blogs require a date"
    }).end()
  }

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" })
    }
    const blog = new Blog({ ...body })
    const savedBlog = await blog.save()
    response.json(savedBlog)
  }
  catch (error) {
    next(error)
  }
})

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body
  if(!("title" in body)){
    return response.status(400).json({
      error: "projects require a title"
    }).end()
  }
  if(!("writtenOnDate" in body)){
    return response.status(400).json({
      error: "blogs require a date"
    }).end()
  }

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" })
    }
    const newBlog = {
      title: body.title,
      body: body.body,
      writtenOnDate: body.writtenOnDate
    }
      const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
      if (updatedBlog == null){
        return response.status(400).json({
          error: "bad id"
        })
      }
    response.json(updatedBlog)
  }
  catch (error) {
    next(error)
  }
})

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" })
    }
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  }
  catch(error) {
    next(error)
  }
})

module.exports = blogsRouter