import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = (props) => {
    console.log(props)
    return(
        <div className='box nav'>
            
            <NavLink className="link" activeClassName="activeLink" exact={true} to="/">Home</NavLink>
            {props.user ? <NavLink className="link" activeClassName="activeLink" to="/room">Room</NavLink> : <span className='link'>Please Log In to Search And Sing</span> }
            {props.user ? <span className='link'>Welcome {props.user.name}!</span> : <NavLink className="link" activeClassName="activeLink" to="/login">Login</NavLink>}
            {props.user ? <NavLink className="link" activeClassName="activeLink" exact to="/" onClick={props.logout}>Logout</NavLink> : <NavLink className="link" activeClassName="activeLink" to="/signup">Signup</NavLink>}
            
        </div>
    )
}

export default NavBar