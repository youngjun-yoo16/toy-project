const Hobbies = ({ hobbies, toggleDelete }) => {
    return (
      <div>
        <h2>Hobbies</h2>
        <table>
          <tr>
            <th>No.</th>
            <th>User ID</th>
            <th>Name</th>
            <th>Sport</th>
            <th>Instrument</th>
            <th>Delete</th>
          </tr>

          {hobbies.map(hobby =>
            <tr key={hobby.sport}>
              <td>{hobby.id}</td>
              <td>{hobby.fk_user_id}</td>
              <td>{hobby.name}</td>
              <td>{hobby.sport}</td>
              <td>{hobby.instrument}</td>
              <td><button class="warn" onClick={() => toggleDelete(hobby.id)}>delete</button></td>
            </tr>
          )}

        </table>
      </div>
    )
  }

  export default Hobbies