import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import './Register.css'


const Register = (props) => {
    const Navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const [userReg, setUserReg] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:''
    })

    const onChangeHandler = (e) => {
        setUserReg({...userReg, [e.target.name]: e.target.value})
    }


    // Submit Handle
    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', userReg, {withCredentials:true})
        .then((res) => {
            console.log(res)
            Navigate('/dashboard')
        })
        .catch((err) => {
            setErrors(err.response.data.error.errors)
        })
    }


    return (
        <div className="d-flex justify-content-evenly align-items-center p-5">
                <div id="carouselExampleIndicators" className="carousel slide w-50" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                        <img src="https://sm.ign.com/t/ign_in/photo/default/3-naruto-1660779038828_9te5.1280.jpg" className="d-block w-100" alt="Naruto"/>
                        </div>
                        <div className="carousel-item">
                        <img src="https://www.awn.com/sites/default/files/styles/original/public/image/featured/onepiece1999-1280.jpg?itok=HITwmnXc" className="d-block w-100" alt="One Piece"/>
                        </div>
                        <div className="carousel-item">
                        <img src="https://free4kwallpapers.com/uploads/wallpaper/anime-bleach-hd-wallpaper-1920x1080-1280x720-wallpaper.jpg" className="d-block w-100" alt="Bleach"/>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

                <div className="w-25">
                    <form onSubmit={submitHandler} className='container w-75 col-4 mx-auto user-form'>
                    <h2 className='text-center'>Register!</h2>
                        <label className='form-label'>First Name:</label>
                        <input className='form-control' type="text" name='firstName' value={userReg.firstName} onChange={onChangeHandler}/>
                        {
                            errors.firstName? 
                            <p className='text-danger'>{errors.firstName.message}</p>:
                            null
                        }

                        <label className='form-label'>Last Name:</label>
                        <input className='form-control' type="text" name='lastName' value={userReg.lastName} onChange={onChangeHandler}/>
                        {
                            errors.lastName? 
                            <p className='text-danger'>{errors.lastName.message}</p>:
                            null
                        }

                        <label className='form-label'>Email:</label>
                        <input className='form-control' type="text" name='email' value={userReg.email} onChange={onChangeHandler}/>
                        {
                            errors.email? 
                            <p className='text-danger'>{errors.email.message}</p>:
                            null
                        }

                        <label className='form-label'>Password:</label>
                        <input className='form-control' type="password" name='password' value={userReg.password} onChange={onChangeHandler}/>
                        {
                            errors.password? 
                            <p className='text-danger'>{errors.password.message}</p>:
                            null
                        }

                        <label className='form-label'>Confirm Password:</label>
                        <input className='form-control' type="password" name='confirmPassword' value={userReg.confirmPassword} onChange={onChangeHandler}/>
                        <button className='btn btn-dark my-3'>Register</button>
                        <br/>
                        <p>Already have an account? <Link to={"/login"}>Click here</Link></p>
                    </form>
                </div>
        </div>
)}

export default Register;