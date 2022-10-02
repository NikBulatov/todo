import React from 'react';

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {login: '', password: ''}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        this.props.getToken(this.state.login, this.state.password)
        event.preventDefault()
    }

    render() {
        document.title = 'Login Page';
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="login" placeholder="login"
                       value={this.state.login} onChange={this.handleChange}/>
                <input type="password" name="password" placeholder="password"
                       value={this.state.password} onChange={this.handleChange}/>
                <input type="submit" value="Login"/>
            </form>
        );
    }
}

export default LoginForm
