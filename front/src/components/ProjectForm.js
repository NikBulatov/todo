import React from 'react';


class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            url: '',
            users: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSelectChange(event) {
        const target = event.target;
        const name = target.name;
        const options = target.options;
        const value = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({
            [name]: value,
        });
    }


    handleSubmit(event) {
        console.log(this.state.name);
        this.props.createProject(this.state.name, this.state.url, this.state.users)
        event.preventDefault()
    }

    render() {
        document.title = 'Create Project';

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" name="name" value={this.state.name}
                           onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="url">URL</label>
                    <input type="url" className="form-control" name="url" value={this.state.url}
                           onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="users">Users
                        <br/>
                        <select name="users" multiple={true} onChange={this.handleSelectChange}>
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

export default ProjectForm;