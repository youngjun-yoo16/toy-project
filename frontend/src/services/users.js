import axios from 'axios'
const userBaseUrl = 'http://localhost:3001/users'

const getAll = async () => {
    const response = await axios.get(userBaseUrl)
    return response.data
}

const getOne = async id => {
    const response = await axios.get(`${userBaseUrl}/${id}`)
    return response.data
}

const create = async newObject => {
    const response = await axios.post(userBaseUrl, newObject)
    return response.data
}

const update = async (id, newObject) => {
    const response = await axios.put(`${userBaseUrl}/${id}`, newObject)
    return response.data
}

const remove = id => {
    return axios.delete(`${userBaseUrl}/${id}`)
}
// eslint-disable-next-line
export default {
    getAll,
    getOne,
    create,
    update,
    remove
}