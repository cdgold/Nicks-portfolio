import axios from "axios"
const baseUrl = "/api/projects"

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const postEntry = async ( newEntry ) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log("new entry is: ", newEntry)
  console.log("new entry[0] is: ", newEntry[0])
  const response = await axios.post(baseUrl, newEntry, config)
  return response.data
}

export default {
  getAll,
  postEntry,
  setToken
}