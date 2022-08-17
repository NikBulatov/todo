import React from 'react';
import { useParams } from 'react-router-dom';


const ProjectItem = ({project}) => {
        document.title = `Project ${project.name}`;

    return (
        <tbody>
        <tr>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.url}</td>
            <td>{project.users.map(user => ` | ${user.lastName} ${user.firstName}`)}</td>
        </tr>
        </tbody>
    )
};

const ProjectItems = ({items}) => {
    let {id} = useParams();
    let filtered_items = items.filter(item => item.id == id)

    return (
        <table className="table">
            <thead>
            <tr>
                <th>Project ID</th>
                <th>Project Name</th>
                <th>Project URL</th>
                <th>Project Users</th>
            </tr>
            </thead>
            {filtered_items.map(project => <ProjectItem project={project} key={project.id}/>)}
        </table>
    )
};

export default ProjectItems;