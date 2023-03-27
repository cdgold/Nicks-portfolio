const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
  title: String,
  description: String
})

// figure out way to upload

projectSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Project", projectSchema)