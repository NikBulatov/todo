import React from 'react';
import axios from "axios";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Cookies from 'universal-cookie';

import 'bootstrap/dist/css/bootstrap.min.css'
import './bootstrap/css/sticky-footer-navbar.css'

import UserList from "./components/User";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import NotFound404 from "./components/NotFound";
import ProjectList from "./components/Project";
import ToDoList from "./components/ToDo";
import ProjectItems from "./components/ProjectItem"
import LoginForm from "./components/Auth";
import ProjectForm from "./components/ProjectForm";
import ToDoForm from "./components/ToDoForm";


const DOMAIN = 'http://127.0.0.1:8000/api'
const getUrl = (url) => `${DOMAIN}${url}`

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
                {name: 'Login', link: '/login', id: 4},
            ],
            token: '',
        }
    }

    deleteProject(id) {
        const headers = this.getHeaders();
        axios.delete(`${getUrl(this.state.menuItems[1].link)}/${id}`, {headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter(item => item.id !== id)})
            }).catch(error => console.log(error))
    }

    createProject(name, url, users) {
        const headers = this.getHeaders();
        let data = {name: name, url: url, users: users};
        axios.post(`${getUrl(this.state.menuItems[1].link)}/`, data, {headers})
            .then(response => {
                    let newProject = response.data;
                    newProject.users = this.state.users.filter(user => user.id in users);
                    this.setState({projects: [...this.state.projects, newProject]})
                }
            ).catch(error => console.log(error))
    }

    deleteToDo(id) {
        const headers = this.getHeaders();
        axios.delete(`${getUrl(this.state.menuItems[2].link)}/${id}`, {headers})
            .then(response => {
                this.setState({todos: this.state.todos.filter(item => item.id !== id)})
            }).catch(error => console.log(error))
    }

    createToDo(status, user, text, project) {
        const headers = this.getHeaders();
        let data = {
            status: status,
            user: user,
            text: text,
            project: project
        };
        axios.post(`${getUrl(this.state.menuItems[2].link)}/`, data, {headers})
            .then(response => {
                    let newToDo = response.data;
                    newToDo.user = this.state.users.filter(user => user == user);
                    this.setState({todos: [...this.state.todos, newToDo]})
                }
            ).catch(error => console.log(error))
    }

    getUsers() {
        return this.state.users
    }

    getUser(id) {
        return this.state.users.filter(user => user.id == id)[0]
    }

    getProjects() {
        return this.state.projects
    }

    getProject(id) {
        return this.state.projects.filter(project => project.id == id)[0]
    }

    getCookies() {
        return new Cookies()
    }

    isAuthenticated() {
        return this.state.token != ''
    }

    logout() {
        this.setToken('');
        window.location.reload();
    }

    getHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': this.isAuthenticated() ? `Bearer ${this.state.token}` : ''
        }
    }

    setToken(token) {
        const cookies = this.getCookies();
        cookies.set('token', token);
        this.setState({'token': token}, () => this.loadData());
    }

    getTokenFromCookies() {
        const cookies = this.getCookies();
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.loadData())
    }


    getToken(email, password) {
        axios.post(getUrl('/token/'), {
            email: email,
            password: password
        },)
            .then(response => {
                this.setToken(response.data['access'])
            }).catch(error => alert('Неверный логин или пароль'))
    }

    loadData() {
        const headers = this.getHeaders();

        axios.get(getUrl(this.state.menuItems[0].link), {headers})
            .then(response => {
                this.setState({users: response.data})
            }).catch(error => console.log(error));

        axios.get(getUrl(this.state.menuItems[1].link), {headers})
            .then(response => {
                this.setState({projects: response.data})
            }).catch(error => console.log(error));

        axios.get(getUrl(this.state.menuItems[2].link), {headers})
            .then(response => {
                this.setState({todos: response.data})
            }).catch(error => console.log(error));
    }

    componentDidMount() {
        this.getTokenFromCookies();
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <header>
                        <Menu menuItems={this.state.menuItems}/>
                        {this.isAuthenticated() ? <button onClick={() => this.logout()}>Logout</button> : null}
                    </header>
                    <div className="container">
                        <Routes>
                            <Route exact path="/" element={<Navigate replace to={this.state.menuItems[0].link}/>}/>

                            <Route exact path={this.state.menuItems[0].link}
                                   element={<UserList users={this.state.users}/>}/>

                            <Route exact path={this.state.menuItems[1].link}
                                   element={<ProjectList projects={this.state.projects}/>}/>
                            <Route path="/:id" element={<ProjectItems items={this.state.projects}
                                                                      deleteProject={id => this.deleteProject(id)}
                                                                      getUsers={() => this.getUsers()}/>}/>
                            <Route exact path={`${this.state.menuItems[1].link}/create`}
                                   element={<ProjectForm getUsers={() => this.getUsers()}
                                                         createProject={(name, url, users) =>
                                                             this.createProject(name, url, users)}/>}/>

                            <Route exact path={this.state.menuItems[2].link}
                                   element={<ToDoList getUser={id => this.getUser(id)}
                                                      getProject={id => this.getProject(id)}
                                                      todos={this.state.todos}
                                                      deleteToDo={id => this.deleteToDo(id)}/>}/>
                            <Route exact path={`${this.state.menuItems[2].link}/create`}
                                   element={<ToDoForm getUsers={() => this.getUsers()}
                                                      getProjects={() => this.getProjects()}
                                                      createToDo={(status, user, text, project) =>
                                                          this.createToDo(status, user, text, project)}/>}/>

                            <Route exact path='/login' element={<LoginForm
                                getToken={(email, password) => this.getToken(email, password)}/>}/>

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
