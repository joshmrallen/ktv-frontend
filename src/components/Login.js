import React from 'react'

const Login = (props) => {

    return(
        <form className='Box Login' onSubmit={props.submitHandler}>
            <input type='email' name='login_email' placeholder='Email' onChange={props.changeHandler} value={props.email} />
            <input type='password' name='login_password' placeholder='Password' onChange={props.changeHandler} value={props.password} />
            <input type='submit' value='Login!' />
        </form>
    )
}

export default Login