import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = (props) => {
    console.log(props)
    return(
        <div className='box nav'>
            
            <NavLink className="link" activeClassName="activeLink" exact={true} to="/">Home</NavLink>
            {props.user ?  <NavLink className="link" activeClassName="activeLink" to="/search">Search for Songs</NavLink> : <span className='link'>Please Log In to Search And Sing</span> }
            {props.user ? <span className='link'>Welcome</span> : <NavLink className="link" activeClassName="activeLink" to="/signup">Signup</NavLink>}
            {props.user ? <span className='link'>{props.user.name}</span> : <NavLink className="link" activeClassName="activeLink" to="/login">Login</NavLink>}
            {props.roomId ? <NavLink className="link" activeClassName="activeLink" to="/room">Room</NavLink> : null}
            {props.user ? <NavLink className="link" activeClassName="activeLink" exact to="/" onClick={props.logout}>Logout</NavLink> : null}
        </div>
    )
}

export default NavBar