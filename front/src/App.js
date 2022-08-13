import React from 'react';
import './App.css';
import axios from "axios";
import UserList from "./components/User";
import Footer from "./components/Footer";
import Menu from "./components/Menu";

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
                <Menu/>
                <div className="container">
                    <UserList users={this.state.users}/>
                </div>
                <Footer/>
            </div>
        )
    }
}


export default App;
