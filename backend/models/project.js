const mongoose = require("mongoose")

// fileTypes are: PDF, video, image, none

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  fileURL: String,
  fileType: String,
  writtenOnDate: Date
})
  
projectSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Project =  mongoose.model("Project", projectSchema)
module.exports = Project