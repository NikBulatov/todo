import React from 'react';
import {Link} from 'react-router-dom';


const ProjectItem = ({project}) => {
    return (
        <tbody>
        <tr>
            <td><Link to={`/${project.id}`}>{project.name}</Link></td>
        </tr>
        </tbody>
    )
};

const ProjectList = ({projects}) => {
    document.title = "Projects";

    return (
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th>Project Name</th>
                </tr>
                </thead>
                {projects.map(project => <ProjectItem project={project} key={project.id}/>)}
            </table>
            <Link to='/projects/create'>Create</Link>
        </div>

    )
};

export default ProjectList;