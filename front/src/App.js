import React from 'react';
import axios from "axios";
import {BrowserRouter, Route, Navigate, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import './bootstrap/css/sticky-footer-navbar.css'
import UserList from "./components/User";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import NotFound404 from "./components/NotFound";
import ProjectList from "./components/Project";
import ToDoList from "./components/ToDo";
import ProjectItems from "./components/ProjectItem"

const DOMAIN = 'http://127.0.0.1:8000/api'
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
                {name: 'ToDos', link: '/todos', id: 3},
            ],
        }
    }

    loadData() {
        axios.get(get_url(this.state.menuItems[0].link))
            .then(response => {
                this.setState({users: response.data.results})
            }).catch(error => console.log(error));

        axios.get(get_url(this.state.menuItems[1].link))
            .then(response => {
                this.setState({projects: response.data.results})
            }).catch(error => console.log(error));

        axios.get(get_url(this.state.menuItems[2].link))
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
                <BrowserRouter>
                    <header>
                        <Menu menuItems={this.state.menuItems}/>
                    </header>
                    <div className="container">
                        <Routes>
                            <Route exact path="/" element={<Navigate replace to={this.state.menuItems[0].link}/>}/>
                            <Route exact path={this.state.menuItems[0].link}
                                   element={<UserList users={this.state.users}/>}/>
                            <Route exact path={this.state.menuItems[1].link}
                                   element={<ProjectList projects={this.state.projects}/>}/>
                            <Route path="/:id" element={<ProjectItems items={this.state.projects}/>}/>
                            <Route exact path={this.state.menuItems[2].link}
                                   element={<ToDoList todos={this.state.todos}/>}/>
                            <Route exact path="*" element={<NotFound404 location={window.location}/>}/>
                        </Routes>
                    </div>
                </BrowserRouter>
                <Footer/>
            </div>
        )
    }
}


export default App;
