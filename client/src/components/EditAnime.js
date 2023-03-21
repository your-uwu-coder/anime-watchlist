import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios';

const EditAnime = (props) => {
    const [anime, setAnime] = useState([{
        title:"",
        episodes:"",
        synopsis: "",
        status: "",
        comment: ""
    }])
    const [errors, setErrors] = useState({})
    const [time, setTime] = useState("")
    const {id} = useParams();
    const Navigate = useNavigate();

    //anime data details
    useEffect(() => {
        axios.get(`http://localhost:8000/api/oneAnime/${id}`)
        .then((oneAnime) => {
            setAnime(oneAnime.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    //timestamp 
    var showDate = new Date();
    var timeStamp = showDate.toLocaleTimeString();
    var dateStamp = showDate.toLocaleDateString();
    var stamp = `${dateStamp} ${timeStamp}` 
    

    const changeHandler = (e) => {
        setAnime(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    const updateHandler = (e) => {
        e.preventDefault();
        document.getElementById("textarea").value = ""
        console.log(anime)
        axios.put(`http://localhost:8000/api/edit/${id}`, anime)
        .then((res) => {
            setTime(...time, stamp);
            Navigate("/allanime")
        })
        .catch((err) => {
            setErrors(err.response.data.errors)
        })
    }

    return (
            <div className="w-25 mx-auto">
                <form onSubmit={updateHandler} className='border mb-5 w-100'>
                    <div className="text-content"> 
                        <Link to="/allanime" className="text-light">⬅ Back to Watch List </Link>
                        <h3 className='text-dark mt-2'> {anime.title} </h3>
                        <select className='form-select mb-3 w-50' onChange={changeHandler} name='status' value={anime.status}>
                            <option>(Choose one)</option>
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                            {
                                errors.status?
                                <p className='text-danger'>{errors.status.message}</p>:
                                null
                            }
                        
                        <p className='mb-0 fw-bold'>Comments:</p>
                        <textarea id="textarea" className='form-control w-50' placeholder="Type here..." onChange={e => setAnime({...anime, 'comment': e.target.value})}/>
                        <br/>
                        <button className='btn btn-light btn-sm mt-3'>Update</button>
                    </div>
                </form>
                <div className="text-light">
                    <h2>📝Comments:</h2>
                    <p>{stamp}</p>
                    <p>{anime.comment}</p>
                </div>
            </div>
    )
}

export default EditAnime;