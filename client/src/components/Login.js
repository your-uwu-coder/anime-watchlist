import React, {useState} from "react";
import {Link} from 'react-router-dom'

const Login = (props) => {

    const [userLogin, setUserLogin] = useState({
        email:'',
        password:'',
    })

    const onChangeHandler = (e) => {
        setUserLogin({...userLogin, [e.target.name]: e.target.value})
    }

    return (
        <div className="">
            <h1 className='text-white'>Welcome Back!</h1>
            <form className='col-4 mx-auto user-form'>
                <label className='form-label'>Email:</label>
                <input className='form-control' type="text" name='email' value={userLogin.email} onChange={onChangeHandler}/>

                <label className='form-label'>Password:</label>
                <input className='form-control' type="password" name='password' value={userLogin.password} onChange={onChangeHandler}/>

                <button className='btn btn-dark mt-3'>Login</button>
                <br/>
                <Link to={"/"}>Don't have an account? Click here to sign up!</Link>
            </form>
        </div>
    )
}

export default Login;