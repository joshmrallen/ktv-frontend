import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = (props) => {
    console.log(props)
    return(
        <div className='box nav'>
            
            <NavLink className="link" activeClassName="activeLink" exact={true} to="/">Home</NavLink>
            <NavLink className="link" activeClassName="activeLink" to="/search">Search for Songs</NavLink>
            {props.user ? <span>Welcome</span> :<NavLink className="link" activeClassName="activeLink" to="/signup">Signup</NavLink>}
            {props.user ? <span>Sing With Us</span> :<NavLink className="link" activeClassName="activeLink" to="/login">Login</NavLink>}
            {props.roomId ? <NavLink className="link" activeClassName="activeLink" to="/room">Room</NavLink> : null}
            
        </div>
    )
}

export default NavBar