import axios from 'axios'
const userBaseUrl = 'http://localhost:3001/users'
const hobbyBaseUrl = 'http://localhost:3001/hobbies'

const getAll = async () => {
    const response = await axios.get(`${userBaseUrl}/hobbies`)
    return response.data
}

const getOne = async id => {
    const response = await axios.get(`${hobbyBaseUrl}/${id}`)
    return response.data
}

const getOneByUserId = async id => {
    const response = await axios.get(`${userBaseUrl}/hobbies/${id}`)
    return response.data
}

const create = async newObject => {
    const response = await axios.post(hobbyBaseUrl, newObject)
    return response.data
}

const remove = id => {
    return axios.delete(`${hobbyBaseUrl}/${id}`)
}
// eslint-disable-next-line
export default {
    getAll,
    getOne,
    getOneByUserId,
    create,
    remove
}