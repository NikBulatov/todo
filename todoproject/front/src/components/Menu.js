import React from 'react';
import {Link} from 'react-router-dom';

const MenuItem = ({name, link}) => {
    return (
        <li className="nav-item">
            <Link className="nav-link" to={link}>{name}</Link>
        </li>
    )
}

const Menu = ({menuItems}) => {
    return (
        <nav className="navbar navbar-expand-sm bg-primary navbar-dark justify-content-end">
            <Link to="/" className="navbar-brand">ToDo App</Link>
            <div className="collapse navbar-collapse d-flex bd-highlight" id="navbarCollapse">
                <ul className="navbar-nav mr-auto">
                    {menuItems.map(item => <MenuItem name={item.name} link={item.link} key={item.id}/>)}
                </ul>
                <form className="form-inline mt-2 mt-md-0 d-flex ms-auto bd-highlight">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    )
}

export default Menu;