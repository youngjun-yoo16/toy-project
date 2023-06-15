import { useState, useEffect } from 'react'
import axios from 'axios'
import Users from './components/Users'
import Hobbies from './components/Hobbies'
const userBaseUrl = 'http://localhost:3001/users'
const hobbyBaseUrl = 'http://localhost:3001/hobbies'
let hobby = false

const App = () => {
  const [users, setUsers] = useState([])
  const [hobbies, setHobbies] = useState([])
  const [newUserName, setNewUserName] = useState('')
  const [newUserEmail, setNewUserEmail] = useState('')
  const [userId, setUserId] = useState('')
  const [newSport, setNewSport] = useState('')
  const [newInstrument, setNewInstrument] = useState('')
  const [userNo, setUserNo] = useState('')
  const [userHobbyNo, setUserHobbyNo] = useState('')

  useEffect(() => {
    axios
      .get(userBaseUrl)
      .then(response => {
        setUsers(response.data)
      })
  }, [])

  const toggleDelete = id => {
    if (hobby) {
      const hobbyToDelete = hobbies.find(hobby => hobby.id === id)
      const user = users.find(user => user.id === hobbyToDelete.fk_user_id)
      if (window.confirm(`Delete ${user.name}'s hobby (${hobbyToDelete.sport} and ${hobbyToDelete.instrument})?`)) {
        axios
          .delete(`${hobbyBaseUrl}/${id}`)
          .then(setHobbies(hobbies.filter(hobby => hobby.id !== id)))
          .catch(() => {
            alert(
              `${user.name}'s hobby '${hobbyToDelete.sport}' and '${hobbyToDelete.instrument}' was already deleted from the server.`
              )
          })
      }
    } else {
      const userToDelete = users.find(user => user.id === id)
      if (window.confirm(`Delete ${userToDelete.name}?`)) {
        axios
          .delete(`${userBaseUrl}/${id}`)
          .then(setUsers(users.filter(user => user.id !== id)))
          .catch(() => {
            alert(
            `The user '${userToDelete.name}' was already deleted from the server.`
            )
          })
      }
    }
  }

  const getUsers = () => {
    hobby = false
    axios.get(`${userBaseUrl}`)
      .then(response => {
        setUsers(response.data)
      })
  }

  const getHobbies = () => {
    hobby = true
    axios.get(`${userBaseUrl}/hobbies`)
      .then(response => {
        setHobbies(response.data)
      })
  }

  const getUser = (event) => {
    event.preventDefault()
    hobby = false
    axios.get(`${userBaseUrl}/${userNo}`)
      .then(response => {
        setUsers(response.data)
        setUserNo('')
      })
  }

  const getHobby = (event) => {
    event.preventDefault()
    hobby = true
    axios.get(`${userBaseUrl}/hobbies/${userHobbyNo}`)
      .then(response => {
        setHobbies(response.data)
        setUserHobbyNo('')
      })
  }

  const createNewUserName = (event) => {
    event.preventDefault()
    const newUserObject = {
      name: newUserName,
      email: newUserEmail
    }
    axios.post(userBaseUrl, newUserObject)
      .then(() => {
        setNewUserName('')
        setNewUserEmail('')
        getUsers()
      })
  }

  const createNewHobby = (event) => {
    event.preventDefault()
    const newHobbyObject = {
      fk_user_id: userId,
      sport: newSport,
      instrument: newInstrument
    }
    axios.post(hobbyBaseUrl, newHobbyObject)
      .then(() => {
        setUserId('')
        setNewSport('')
        setNewInstrument('')
        getHobbies()
      })
  }

  const handleNewUserNameChange = ({ target }) => {
    setNewUserName(target.value)
  }

  const handleNewUserEmailChange = ({ target }) => {
    setNewUserEmail(target.value)
  }

  const handleUserIdChange = ({ target }) => {
    setUserId(target.value)
  }

  const handleNewSportChange = ({ target }) => {
    setNewSport(target.value)
  }

  const handleNewInstrumentChange = ({ target }) => {
    setNewInstrument(target.value)
  }

  const handleUserNoChange = ({ target }) => {
    setUserNo(target.value)
  }

  const handleUserHobbyNoChange = ({ target }) => {
    setUserHobbyNo(target.value)
  }

  return (
    <div>
      <h1>Toy Project</h1>
      {hobby ? <Hobbies hobbies={hobbies} toggleDelete={toggleDelete} /> 
             : <Users users={users} toggleDelete={toggleDelete} />}
      <br />
      <h2>Functionalities:</h2>
      <h2>1. Create User</h2>
      <form onSubmit={createNewUserName}>
        Name: &nbsp;
        <input
          value={newUserName}
          onChange={handleNewUserNameChange}
          required
        />
        &nbsp;
        Email: &nbsp;
        <input
          value={newUserEmail}
          onChange={handleNewUserEmailChange}
          required
        />
        &nbsp;
        <button type="submit" class="enter">Enter</button>
      </form>
      <br />
      <h2>2. Create Hobby</h2>
      <form onSubmit={createNewHobby}>
        User Id: &nbsp;
        <input 
          value={userId}
          onChange={handleUserIdChange}
          required
        /> 
        &nbsp; 
        Sport: &nbsp;
        <input 
          value={newSport}
          onChange={handleNewSportChange}
          required
        /> 
        &nbsp; 
        Instrument: &nbsp;
        <input 
          value={newInstrument}
          onChange={handleNewInstrumentChange}
          required
        /> 
        &nbsp;
        <button type="submit" class="enter">Enter</button>
      </form>
      <br /> <br />
      <h2>3. Get User by ID</h2>
      <form onSubmit={getUser}>
        Enter any user id from above: &nbsp;
        <input
          value={userNo}
          onChange={handleUserNoChange}
        />
        &nbsp;
        <button type="submit" class="enter">Enter</button>
      </form>
      <br /> <br />
      <h2>4. Get User's hobbies by User ID</h2>
      <form onSubmit={getHobby}>
        Enter any user id from above: &nbsp;
        <input
          value={userHobbyNo}
          onChange={handleUserHobbyNoChange}
        />
        &nbsp;
        <button type="submit" class="enter">Enter</button>
      </form>
      <br /> <br />
    </div>
  )
}

export default App