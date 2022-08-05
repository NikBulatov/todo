import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import UserList from "./components/User";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/').then(response => {
            this.setState({
                'users': response.data
            })
        }).catch(error => console.log(error));
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Welcome to ToDo App!</h1>
                </header>
                <div className="container">
                    <UserList users={this.state.users}/>
                </div>
                <footer className="App-footer">
                    <h1>Hello from Footer!</h1>
                </footer>
            </div>
        )
    }
}


export default App;
