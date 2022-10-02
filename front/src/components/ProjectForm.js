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
        this.handleSelectUsersChange = this.handleSelectUsersChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSelectUsersChange(event) {
        const options = [...event.target.getElementsByTagName('option')];
        const filtered_options = options.filter(option => option.selected === true).map(option => +option.value);
        const users = this.props.users.filter(user => filtered_options.includes(user.id));
        this.setState({
            users: users,
        });
    }


    handleSubmit(event) {
        console.log(this.state.users);
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
                        <select name="users" multiple={true} onChange={this.handleSelectUsersChange}>
                            {this.props.users.map(user =>
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