const Create = ({
    createNewUserName,
    newUserName,
    newUserEmail,
    onUserNameChange,
    onUserEmailChange,
    createNewHobby,
    userId,
    newSport,
    newInstrument,
    onUserIdChange,
    onSportChange,
    onInstrumentChange
}) => {
    return (
        <div>
            <h2>Functionalities:</h2>
            <br />
            <h2>1. Create User</h2>
            <form onSubmit={createNewUserName}>
                Name: &nbsp;
                <input
                    value={newUserName}
                    onChange={onUserNameChange}
                    required
                />
                &nbsp;
                Email: &nbsp;
                <input
                    value={newUserEmail}
                    onChange={onUserEmailChange}
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
                    onChange={onUserIdChange}
                    required
                />
                &nbsp;
                Sport: &nbsp;
                <input
                    value={newSport}
                    onChange={onSportChange}
                    required
                />
                &nbsp;
                Instrument: &nbsp;
                <input
                    value={newInstrument}
                    onChange={onInstrumentChange}
                    required
                />
                &nbsp;
                <button type="submit" class="enter">Enter</button>
            </form>
        </div>
    )
}

export default Create