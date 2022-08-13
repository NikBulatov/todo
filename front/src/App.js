import React from 'react';
import axios from "axios";
import './bootstrap/css/bootstrap.min.css'
import './bootstrap/css/sticky-footer-navbar.css'
import UserList from "./components/User";
import Footer from "./components/Footer";
import Menu from "./components/Menu";


const DOMAIN = 'http://127.0.0.1:8000/api/'
const get_url = (url) => `${DOMAIN}${url}`

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            projects: [],
            todos: [],
            menuItems: [
                {name: 'Users', link: '/users', id: 1},
                {name: 'Projects', link: '/projects', id: 2},
                {name: 'TODOs', link: '/todos', id: 3},
            ],
        }
    }

    loadData() {
        axios.get(get_url('users/'))
            .then(response => {
                this.setState({users: response.data.results})
            }).catch(error => console.log(error));

        axios.get(get_url('projects/'))
            .then(response => {
                this.setState({projects: response.data.results})
            }).catch(error => console.log(error));

        axios.get(get_url('todos/'))
            .then(response => {
                this.setState({todos: response.data.results})
            }).catch(error => console.log(error));
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        return (
            <div className="App">
                <header>
                    <Menu menuItems={this.state.menuItems}/>
                </header>
                <div className="container">
                    <UserList users={this.state.users}/>
                </div>
                <Footer/>
            </div>
        )
    }
}


export default App;
