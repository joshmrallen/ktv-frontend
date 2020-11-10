import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = (props) => {
    // console.log(props)
    return(
        <div className='nav' style={{visibility: 'hidden'}}>
            {props.user ? <NavLink className="link" activeClassName="activeLink" exact={true} to="/">Home</NavLink> : null}
            {props.user ? <NavLink className="link" activeClassName="activeLink" to="/room">Room</NavLink> : null}
            {props.user ? <span className='hellouser'>Welcome {props.user.name}!</span> : <NavLink className="link" activeClassName="activeLink" to="/login">Login</NavLink>}
            {props.user ? <NavLink className="link" activeClassName="activeLink" exact to="/" onClick={props.logout}>Logout</NavLink> : <NavLink className="link" activeClassName="activeLink" to="/signup">Signup</NavLink>}
        </div>
    )
}

export default NavBar