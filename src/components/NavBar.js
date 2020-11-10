import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = (props) => {
    // console.log(props)
    return(
        <div className='nav' style={props.user ? {visibility: 'visible'} : {visibility: 'hidden'}} >
            <NavLink className="link" activeClassName="activeLink" exact={true} to="/">Home</NavLink>
            <NavLink className="link" activeClassName="activeLink" to="/room">Room</NavLink>
            <span className='hellouser'>Welcome {props.user.name}!</span> : <NavLink className="link" activeClassName="activeLink" to="/login">Login</NavLink>
            <NavLink className="link" activeClassName="activeLink" exact to="/" onClick={props.logout}>Logout</NavLink> : <NavLink className="link" activeClassName="activeLink" to="/signup">Signup</NavLink>
        </div>
    )
}

export default NavBar