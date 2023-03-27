const mongoose = require("mongoose")

// CATEGORIES: education, job, skill

// skill do not have a startDate or endDate

const resumeEntrySchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  category: String,
  startDate: Date,
  endDate: Date,
  bullets: {
    type: Array,
    "default": []
  }
})

resumeEntrySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("resumeEntry", resumeEntrySchema)