import axios from "axios"
const baseUrl = "/api/projects"

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  let returnProjects = [ ...response.data ]
  if (Array.isArray(returnProjects) && returnProjects.length > 0){
    returnProjects.forEach((project, index, array) => {
      if(typeof project.writtenOnDate !== "undefined"){
        array[index].writtenOnDate = new Date(project.writtenOnDate)
      }
    })
  }
  return returnProjects
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
    fileURL: newProject.fileURL,
    fileType: newProject.fileType,
    writtenOnDate: newProject.writtenOnDate
  }
  const putProjectURL = baseUrl + "/" + newProject.id
  console.log("Attempting put at ", putProjectURL, " with ", projectToPut)
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