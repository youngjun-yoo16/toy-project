import { useState, useEffect } from 'react'
import Users from './components/Users'
import Hobbies from './components/Hobbies'
import Create from './components/Create'
import Read from './components/Read'
import Update from './components/Update'
import userService from './services/users'
import hobbyService from './services/hobbies'
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
  const [userIdForUpdate, setUserIdForUpdate] = useState('')
  const [updatedUserName, setUpdatedUserName] = useState('')
  const [updatedUserEmail, setUpdatedUserEmail] = useState('')

  useEffect(() => {
    userService
      .getAll()
      .then(initialEntries => {
        setUsers(initialEntries)
      })
  }, [])

  const toggleDelete = id => {
    if (hobby) {
      const hobbyToDelete = hobbies.find(hobby => hobby.id === id)
      const user = users.find(user => user.id === hobbyToDelete.fk_user_id)
      if (window.confirm(`Delete ${user.name}'s hobby (${hobbyToDelete.sport} and ${hobbyToDelete.instrument})?`)) {
        hobbyService
          .remove(id)
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
        userService
          .remove(id)
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
    userService
      .getAll()
      .then(initialEntries => {
        setUsers(initialEntries)
      })
  }

  const getHobbies = () => {
    hobby = true
    hobbyService
      .getAll()
      .then(initialEntries => {
        setHobbies(initialEntries)
      })
  }

  const getUser = (event) => {
    event.preventDefault()
    hobby = false
    userService
      .getOne(userNo)
      .then(entries => {
        setUsers(entries)
        setUserNo('')
      })
  }

  const getHobby = (event) => {
    event.preventDefault()
    hobby = true
    hobbyService
      .getOneByUserId(userHobbyNo)
      .then(entries => {
        setHobbies(entries)
        setUserHobbyNo('')
      })
  }

  const createNewUserName = (event) => {
    event.preventDefault()
    const newUserObject = {
      name: newUserName,
      email: newUserEmail
    }
    userService
      .create(newUserObject)
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
    hobbyService.create(newHobbyObject)
      .then(() => {
        setUserId('')
        setNewSport('')
        setNewInstrument('')
        getHobbies()
      })
  }

  const updateUser = (event) => {
    event.preventDefault()
    const newUser = {
      name: updatedUserName,
      email: updatedUserEmail
    }
    userService
      .update(userIdForUpdate, newUser)
      .then(() => {
        setUserIdForUpdate('')
        setUpdatedUserName('')
        setUpdatedUserEmail('')
        getUsers()
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

  const handleUpdatedUserNameChange = ({ target }) => {
    setUpdatedUserName(target.value)
  }

  const handleUpdatedUserEmailChange = ({ target }) => {
    setUpdatedUserEmail(target.value)
  }

  const handleUserIdForUpdateChange = ({ target }) => {
    setUserIdForUpdate(target.value)
  }

  return (
    <div>
      <h1>Toy Project</h1>
      {hobby ? <Hobbies hobbies={hobbies} toggleDelete={toggleDelete} />
        : <Users users={users} toggleDelete={toggleDelete} />}
      <br /> <hr />
      <Create createNewUserName={createNewUserName} newUserName={newUserName} newUserEmail={newUserEmail}
        onUserNameChange={handleNewUserNameChange} onUserEmailChange={handleNewUserEmailChange}
        createNewHobby={createNewHobby} userId={userId} newSport={newSport} newInstrument={newInstrument}
        onUserIdChange={handleUserIdChange} onSportChange={handleNewSportChange} onInstrumentChange={handleNewInstrumentChange} />
      <br /> <br />
      <Read getUser={getUser} userNo={userNo} onUserNoChange={handleUserNoChange}
        getHobby={getHobby} userHobbyNo={userHobbyNo} onUserHobbyNoChange={handleUserHobbyNoChange} />
      <br /> <br />
      <Update updateUser={updateUser} userIdForUpdate={userIdForUpdate} onUserIdForUpdateChange={handleUserIdForUpdateChange}
        updatedUserName={updatedUserName} onUpdatedUserNameChange={handleUpdatedUserNameChange}
        updatedUserEmail={updatedUserEmail} onUpdatedUserEmailChange={handleUpdatedUserEmailChange} />
      <br /> <br />
    </div>
  )
}

export default App