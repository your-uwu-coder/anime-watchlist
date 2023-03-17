import axios from "axios";
import React, {useState} from "react";
import {Link, useNavigate} from 'react-router-dom'

const Login = (props) => {
    const Navigate = useNavigate();
    const [userLogin, setUserLogin] = useState({
        email:'',
        password:'',
    })

    const onChangeHandler = (e) => {
        setUserLogin({...userLogin, [e.target.name]: e.target.value})
    }

    const loginHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', userLogin, {withCredentials:true})
        .then((res) => {
            console.log(res)
            Navigate("/dashboard")
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="d-flex justify-content-center gap-5 mx-auto">

            <div className="d-flex flex-column justify-content-center align-items-center">
                <h1 className='text-white'>Welcome Back!</h1>
                <img src='https://media1.giphy.com/media/ryW87OmXokWGUAk4NS/giphy.gif?cid=ecf05e47j6rfymbn1m71pjc5vp5zutxq0qt8iu78bw37e3pz&rid=giphy.gif&ct=s' alt="Anya" className="w-50 h-75" />
            </div>

            <div className="w-25">
                <form onSubmit={loginHandler} className='col-4 w-75 mx-auto user-form'>
                    <label className='form-label'>Email:</label>
                    <input className='form-control' type="text" name='email' value={userLogin.email} onChange={onChangeHandler}/>

                    <label className='form-label'>Password:</label>
                    <input className='form-control' type="password" name='password' value={userLogin.password} onChange={onChangeHandler}/>

                    <button className='btn btn-dark mt-3'>Login</button>
                    <br/>
                    <p>Don't have an account? <Link to={"/"}>Click here</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login;