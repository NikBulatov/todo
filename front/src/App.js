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
                this.setState({users: response.data.results})
            }).catch(error => console.log(error));

        axios.get(getUrl(this.state.menuItems[1].link), {headers})
            .then(response => {
                this.setState({projects: response.data.results})
            }).catch(error => console.log(error));

        axios.get(getUrl(this.state.menuItems[2].link), {headers})
            .then(response => {
                this.setState({todos: response.data.results})
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
                            <Route path="/:id" element={<ProjectItems items={this.state.projects}/>}/>
                            <Route exact path={this.state.menuItems[2].link}
                                   element={<ToDoList todos={this.state.todos}/>}/>
                            <Route exact path="*" element={<NotFound404 location={window.location}/>}/>
                            <Route exact path='/login' element={<LoginForm
                                getToken={(email, password) => this.getToken(email, password)}/>}/>
                        </Routes>
                    </div>
                </BrowserRouter>
                <Footer/>
            </div>
        )
    }
}


export default App;
