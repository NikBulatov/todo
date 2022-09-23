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
        this.handleSelectChange = this.handleSelectChange.bind(this);

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSelectChange(event) {
        const options = event.target.options;
        const value = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({
            [event.target.name]: value,
        });
    }


    handleSubmit(event) {
        console.log(this.state.name);
        this.props.createToDo(this.state.status, this.state.text, this.state.user, this.state.project);
        event.preventDefault()
    }

    render() {
        document.title = 'Create ToDo';

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="text">Text</label>
                    <textarea name="text" className="form-control" onChange={this.handleChange}
                              value={this.state.text}/>
                </div>
                <div className="form-group">
                    <label htmlFor="project">Project</label>
                    <select name="project" value={this.state.project} onChange={this.handleChange}>
                        {this.props.getProjects().map(project =>
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="user">User
                        <br/>
                        <select name="user" value={this.state.user} onChange={this.handleSelectChange}>
                            {this.props.getUsers().map(user =>
                                <option key={user.id} value={user.id}>
                                    {user.firstName} {user.lastName}
                                </option>)}
                        </select>
                    </label>
                </div>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}

export default ToDoForm;