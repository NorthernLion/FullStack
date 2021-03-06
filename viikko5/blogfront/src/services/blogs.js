import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token, 'Content-Type': 'application/json' }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, changedObject) => {
  const config = {
    headers: { 'Authorization': token, 'Content-Type': 'application/json' }
  }
  const response = await axios.put(`${baseUrl}/${id}`, changedObject, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { 'Authorization': token, 'Content-Type': 'application/json' }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, setToken, create, getOne, update, remove }
