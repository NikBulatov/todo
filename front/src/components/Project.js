import React from 'react';

const ProjectItem = ({project}) => {
    return (
        <tbody>
        <tr>
            <td>{project.name}</td>
        </tr>
        </tbody>
    )
};

const ProjectList = ({projects}) => {
    return (
        <table className="table">
            <thead>
            <tr>
                <th>Project Name</th>
            </tr>
            </thead>
            {projects.map(project => <ProjectItem project={project} key={project.id}/>)}
        </table>
    )
};

export default ProjectList;