import React from 'react';


class ToDoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'o',
            user: '',
            text: '',
            project: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectUserChange = this.handleSelectUserChange.bind(this);

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSelectUserChange(event) {
        const options = [...event.target.getElementsByTagName('option')];
        const filtered_options = options.filter(option => option.selected === true).map(option => +option.value);
        const user = this.props.users.filter(user => filtered_options.includes(user.id))[0];
        this.setState({
            user: user,
        });
    }


    handleSubmit(event) {
        console.log(this.state.name);
        this.props.createToDo(this.state.status, this.state.user, this.state.text, this.state.project);
        event.preventDefault()
    }

    render() {
        document.title = 'Create ToDo';

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="text">Text</label>
                    <input type="text" name="text" className="form-control" onChange={this.handleChange}
                           value={this.state.text}/>
                </div>
                <div className="form-group">
                    <label htmlFor="project">Project</label>
                    <select name="project" value={this.state.project} onChange={this.handleChange}>
                        <option value=""></option>

                        {this.props.projects.map(project =>
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="user">User
                        <br/>
                        <select name="user" onChange={this.handleSelectUserChange}>
                            <option value=""></option>
                            {this.props.users.map(user =>
                                <option key={user.id} value={user.id}>
                                    {user.firstName} {user.lastName}
                                </option>
                            )}
                        </select>
                    </label>
                </div>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}

export default ToDoForm;