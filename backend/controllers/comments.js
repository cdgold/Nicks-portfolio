const commentsRouter = require("express").Router()
const Blog = require("../models/blog")
const jwt = require("jsonwebtoken")

const DEFAULT_NAME = "Someone"

commentsRouter.post("/:blogId", async (request, response, next) => {
  const body = request.body
  if(!("content" in body)){
    return response.status(400).json({
      error: "comments cannot be blank"
    }).end()
  }
  if(!("posterName" in body)){
    body.posterName = DEFAULT_NAME
  }
  try {
    const oldBlog = await Blog.findById(request.params.blogId)
    if (oldBlog == null){
      return response.status(400).json({
        error: "bad id"
      })
    }
    console.log("Found old blog, it's: ", oldBlog)
    const newComment = {"posterName": body.posterName, "content": body.content } 
    oldBlog.comments.push(newComment)
    console.log("New blog is: ", oldBlog)
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.blogId, oldBlog, { new: true })
    response.json(updatedBlog)
  }
  catch (error) {
    next(error)
  }
})

/*
commentsRouter.put("/:id", async (request, response, next) => {
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
  const parsedDate = Date.parse(body.writtenOnDate)
  if(isNaN(parsedDate)){
    return response.status(400).json({
      error: "date invalid"
    }).end()
  }
  const dateToSave = new Date(parsedDate)
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" })
    }
    
    const newBlog = {
      title: body.title,
      body: body.body,
      writtenOnDate: dateToSave
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

commentsRouter.delete("/:id", async (request, response, next) => {
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
*/

module.exports = commentsRouter