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

const postProject = async (newProject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newProject, config)
  return response.data
}

const putProject = async (newProject) => {
  const config = {
    headers: { Authorization: token },
  }
  const projectToPut = {
    title: newProject.title,
    description: newProject.description,
    fileURL: newProject.description,
    fileType: newProject.description,
    writtenOnDate: newProject.description
  }
  const putProjectURL = baseUrl + "/" + newProject.id
  const response = await axios.put(putProjectURL, projectToPut, config)
  return response.data
}

const deleteProject = async (project) => {
  const config = {
    headers: { Authorization: token },
  }
  const deleteUrl = baseUrl + "/" + project.id
  console.log("Deleting project at: ", project.id)
  const response = await axios.delete(deleteUrl, config)
  return response.data
}


export default {
  getAll,
  postProject,
  setToken,
  putProject,
  deleteProject
}