import axios from 'axios'
const userBaseUrl = 'http://localhost:3001/users'

const getAll = () => {
    const request = axios.get(userBaseUrl)
    return request.then(response => response.data)
}

const getOne = id => {
    const request = axios.get(`${userBaseUrl}/${id}`)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(userBaseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${userBaseUrl}/${id}`, newObject)
    return request.then(response => response.data)
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