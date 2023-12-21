import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const postComment = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  //console.log("posting with: ", newBlog)
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

export default {
  setToken,
  postComment
}