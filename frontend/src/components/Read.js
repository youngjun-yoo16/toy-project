const Read = ({
    getUser,
    userNo,
    onUserNoChange,
    getHobby,
    userHobbyNo,
    onUserHobbyNoChange
}) => {
    return (
        <div>
            <h2>3. Get User by ID</h2>
            <form onSubmit={getUser}>
                Enter any user id from above: &nbsp;
                <input
                    value={userNo}
                    onChange={onUserNoChange}
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
                    onChange={onUserHobbyNoChange}
                />
                &nbsp;
                <button type="submit" class="enter">Enter</button>
            </form>
        </div>
    )
}

export default Read