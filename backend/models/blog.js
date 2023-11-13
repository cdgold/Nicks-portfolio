const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
  title: String,
  body: String,
  writtenOnDate: Date,
  comments: {
    type: [{
    posterName: String,
    content: String
  }],
    default: []
  }
})

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog =  mongoose.model("Blog", blogSchema)
module.exports = Blog

//