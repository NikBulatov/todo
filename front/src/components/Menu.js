import React from 'react';

const MenuItem = ({name, link}) => {
    return (
        <li>
            <a className="nav-link" href={link}>{name}</a>
        </li>
    )
}

const Menu = ({menuItems}) => {
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-end">
            <h1 className="navbar-brand">ToDo App</h1>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mr-auto">
                    {menuItems.map(item => <MenuItem name={item.name} link={item.link} key={item.id}/>)}
                </ul>
                <form className="form-inline mt-2 mt-md-0">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    )
}

export default Menu;