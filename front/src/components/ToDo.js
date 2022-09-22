import React from 'react';
import {Link} from "react-router-dom";

const ToDoItem = ({todo, project, user, deleteToDo}) => {
    let project_name = project !== undefined ? project.name : 'Unknown';

    return (
        <tbody>
        <tr>
            <td><Link to={`/${todo.project}`}>{project_name}</Link></td>
            <td>{user.firstName} {user.lastName}</td>
            <td>{todo.status}</td>
            <td>{todo.text}</td>
            <td>
                <button onClick={() => deleteToDo(todo.id)} type='button'>Delete</button>
            </td>
        </tr>
        </tbody>
    )
};

const ToDoList = ({todos, getProject, getUser, deleteToDo}) => {
    document.title = "ToDos";

    return (
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th>Project Name</th>
                    <th>User Name</th>
                    <th>Status</th>
                    <th>Text</th>
                </tr>
                </thead>
                {todos.map(todo => <ToDoItem user={(getUser(todo.user))}
                                             project={getProject(todo.project)}
                                             key={todo.id}
                                             todo={todo}
                                             deleteToDo={deleteToDo}/>)}
            </table>
            <Link to='/todos/create'>Create</Link>
        </div>
    )
};

export default ToDoList;