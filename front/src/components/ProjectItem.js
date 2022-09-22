import React from 'react';
import {useParams} from 'react-router-dom';


const ProjectItem = ({project, deleteProject, users}) => {
    document.title = `Project ${project.name}`;
    let users_names = users !== undefined ? users.map(user => ` | ${user.firstName} ${user.lastName}`) : 'Data was not uploaded'

    return (
        <tbody>
        <tr>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.url}</td>
            <td>{users_names}</td>
            <td>
                <button onClick={() => deleteProject(project.id)} type='button'>Delete</button>
            </td>

        </tr>
        </tbody>
    )
};

const ProjectItems = ({items, deleteProject, getUsers}) => {
    let {id} = useParams();
    let filtered_items = items.filter(item => item.id == id)

    return (
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th>Project ID</th>
                    <th>Project Name</th>
                    <th>Project URL</th>
                    <th>Project Users</th>
                </tr>
                </thead>
                {filtered_items.map(project => <ProjectItem
                    users={getUsers().filter(user => user.id in project.users)} project={project} key={project.id}
                    deleteProject={deleteProject}/>)}
            </table>
        </div>
    )
};

export default ProjectItems;