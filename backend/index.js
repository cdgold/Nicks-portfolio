require("dotenv").config()

//const app = require("./app") // the actual Express application
// const config = require("./utils/config")
// const logger = require("./utils/logger")

console.log(`mongodb_uri is: ${process.env.MONGODB_URI}`)

/*
const PORT = 3003
app.listen(PORT, () => {
  console.log(`mongodb_uri is: ${process.env.MONGODB_URI}`)
  console.log(`Server running on port ${PORT}`)
})
*/