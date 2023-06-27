import axios from "axios"
const baseUrl = "/api/resumeEntrys"

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  let returnEntrys = [ ...response.data ]
  if (Array.isArray(returnEntrys) && returnEntrys.length > 0){
    returnEntrys.forEach((entry, index, array) => {
      if(typeof entry.startDate !== "undefined"){
        array[index].startDate = new Date(entry.startDate)
      }
      if(typeof entry.endDate !== "undefined"){
        array[index].endDate = new Date(entry.endDate)
      }
    })
  }

  return returnEntrys
}

const postEntry = async ( newEntry ) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newEntry, config)
  return response.data
}


const deleteEntry = async (resumeEntry) => {
  const config = {
    headers: { Authorization: token },
  }
  const deleteUrl = baseUrl + "/" + resumeEntry.id
  console.log("Deleting project at: ", resumeEntry.id)
  const response = await axios.delete(deleteUrl, config)
  return response.data
}

const putEntry = async (newEntry) => {
  const config = {
    headers: { Authorization: token },
  }
  const entryToPut = {
    title: newEntry.title,
    subtitle: newEntry.subtitle,
    category: newEntry.category,
    startDate: newEntry.startDate,
    endDate: newEntry.endDate,
    bullets: newEntry.bullets
  }
  const putEntryURL = baseUrl + "/" + newEntry.id
  console.log("Attempting put at ", putEntryURL, " with ", entryToPut)
  const response = await axios.put(putEntryURL, entryToPut, config)
  return response.data
}

export default {
  getAll,
  postEntry,
  deleteEntry,
  putEntry,
  setToken
}