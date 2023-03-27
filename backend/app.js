const http = require("http")
const express = require("express")
const app = express()
const cors = require("cors")
const logger = require("./utils/logger")
const config = require("./utils/config")
const resumeEntrysRouter = require("./controllers/resumeEntrys")
const middleware = require("./utils/middleware")
const mongoose = require("mongoose")

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB")
  })
  .catch((error) => {
    logger.error("MONGODB_URI is: ", config.MONGODB_URI)
    logger.error("error connecting to MongoDB:", error.message)
  })

app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/resumeEntrys", resumeEntrysRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app