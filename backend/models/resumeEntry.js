const mongoose = require("mongoose")

// CATEGORIES: education, job, skill, pdf

// skills and pdf do not have a startDate or endDate
// pdf title is link to pdf of resume

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

const resumeEntry = mongoose.model("resumeEntry", resumeEntrySchema)

module.exports = resumeEntry