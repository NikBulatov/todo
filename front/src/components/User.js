import React from 'react';


const UserItem = ({user}) => {

    return (
        <tbody>
        <tr>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
        </tr>
        </tbody>
    )
};

const UserList = ({users}) => {
    return (
        <table>
            <thead>
            <tr>
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