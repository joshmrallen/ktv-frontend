import React from 'react'

const SignUp = (props) => {

    return(
        <form onSubmit={props.submitHandler}>
            <input type='text' name='signup_name' placeholder='Name' onChange={props.changeHandler} value={props.name} />
            <input type='email' name='signup_email' placeholder='Email' onChange={props.changeHandler} value={props.email} />
            <input type='password' name='signup_password' placeholder='Password' onChange={props.changeHandler} value={props.password} />
            <input type='submit' value='Sign Me Up!' />
        </form>
    )
}

export default SignUp