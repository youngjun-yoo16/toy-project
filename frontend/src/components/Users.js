const Users = ({ users, toggleDelete }) => {
  return (
    <div>
      <h2>&lt;Users&gt;</h2>
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Delete</th>
        </tr>

        {users.map(user =>
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td><button class="warn" onClick={() => toggleDelete(user.id)}>delete</button></td>
          </tr>
        )}
      </table>
    </div>
  )
}

export default Users