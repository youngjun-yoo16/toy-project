const Update = ({
    updateUser,
    userIdForUpdate,
    onUserIdForUpdateChange,
    updatedUserName,
    onUpdatedUserNameChange,
    updatedUserEmail,
    onUpdatedUserEmailChange
}) => {
    return (
        <div>
            <h2>5. Update User</h2>
            <form onSubmit={updateUser}>
                User Id: &nbsp;
                <input
                    value={userIdForUpdate}
                    onChange={onUserIdForUpdateChange}
                    required
                />
                &nbsp;
                Name: &nbsp;
                <input
                    value={updatedUserName}
                    onChange={onUpdatedUserNameChange}
                    required
                />
                &nbsp;
                Email: &nbsp;
                <input
                    value={updatedUserEmail}
                    onChange={onUpdatedUserEmailChange}
                    required
                />
                &nbsp;
                <button type="submit" class="enter">Enter</button>
            </form>
        </div>
    )
}

export default Update