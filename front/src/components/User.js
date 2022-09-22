import React from 'react';


const UserItem = ({user}) => {

    return (
        <tbody>
        <tr>
            <td>{user.id}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
        </tr>
        </tbody>
    )
};

const UserList = ({users}) => {
    document.title = "Users";

    return (
        <table className="table">
            <thead>
            <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
            </tr>
            </thead>
            {users.map(user => <UserItem user={user} key={user.id}/>)}
        </table>
    )
};

export default UserList;