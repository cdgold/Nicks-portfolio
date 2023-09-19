import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  let returnBlogs = [ ...response.data ]
  if (Array.isArray(returnBlogs) && returnBlogs.length > 0){
    returnBlogs.forEach((blog, index, array) => {
      if(typeof blog.writtenOnDate !== "undefined"){
        array[index].writtenOnDate = new Date(blog.writtenOnDate)
      }
    })
  }
  return returnBlogs
}

const postBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  //console.log("posting with: ", newBlog)
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const putBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const blogToPut = {
    title: newBlog.title,
    body: newBlog.body,
    writtenOnDate: newBlog.writtenOnDate
  }
  const putBlogURL = baseUrl + "/" + newBlog.id
  //console.log("putting with: ", blogToPut)
  const response = await axios.put(putBlogURL, blogToPut, config)
  return response.data
}

const deleteBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const deleteUrl = baseUrl + "/" + blog.id
  const response = await axios.delete(deleteUrl, config)
  return response.data
}


export default {
  getAll,
  postBlog,
  setToken,
  putBlog,
  deleteBlog
}