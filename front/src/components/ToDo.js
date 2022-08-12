import React from 'react';

const ToDoItem = ({todo}) => {
    return (
        <tbody>
        <tr>
            <td>{todo.project}</td>
            <td>{todo.user}</td>
            <td>{todo.status}</td>
            <td>{todo.text}</td>
        </tr>
        </tbody>
    )
};

const ToDoList = ({todos}) => {
    return (
        <table className="table">
            <thead>
            <tr>
                <th>Project Name</th>
                <th>User Name</th>
                <th>Status</th>
                <th>Text</th>
            </tr>
            </thead>
            {todos.map(todo => <ToDoItem key={todo.id} todo={todo}/>)}
        </table>
    )
};

export default ToDoList;