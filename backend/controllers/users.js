const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.get("/", async (request, response) => {
  const users = await User.find({})

  response.json(users)
})

usersRouter.post("/", async (request, response, next) => {
 
  const username = request.body.username
  const name = request.body.name
  const password = request.body.password


  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  try {
    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  }
  catch (error) {
    next(error)
  }
})

module.exports = usersRouter