import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../components/AddAnimeForm.css';


const AddAnimeForm = (props) => {
    const [anime, setAnime] = useState({
        title:"",
        episodes:"",
        synopsis: "",
        status: "",
        comment: ""
    })
    const [photo, setPhoto] = useState({})
    const [errors, setErrors] = useState({})
    const {id} = useParams();
    const Navigate = useNavigate();

    // anime data details
    useEffect(() => {
        axios.get(`https://api.jikan.moe/v4/anime/${id}`)
        .then((oneAnime) => {
            setAnime(oneAnime.data.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    //anime photo
    useEffect(() => {
        axios.get(`https://api.jikan.moe/v4/anime/${id}`)
        .then((animePic) => {
            setPhoto(animePic.data.data.images.jpg.image_url)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    // handle submit 
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(anime)
        axios.post('http://localhost:8000/api/watchlist', anime)
        .then((res) => {
            // console.log(res.data.data)
            Navigate('/allanime')
        })
        .catch((err) => {
            setErrors(err.response.data.errors)
        })
    }

    return (

        <div className="anime-container">
                <form onSubmit={submitHandler} className='border mb-5'>
                    <img src={photo} alt="Anime" className='img-thumbnail' />
                    <Link to={"/dashboard"} className='text-light'> ⬅ Back to List </Link>
                    <div className="text-content"> 
                        <h3 className='text-dark fw-bold'> {anime.title} </h3>
                        <p> Total Episodes: {anime.episodes} </p>
                        <p> {anime.synopsis} </p>
                        <select className='form-select mb-3 w-25' onChange={e => setAnime({...anime, 'status': e.target.value})}>
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
                        <textarea className='form-control w-50' placeholder="Type here..." onChange={e => setAnime({...anime, 'comment': e.target.value})}/>
                        <br/>
                        <button className='btn btn-success btn-sm mt-3'>Add</button>
                    </div>
                </form>
        </div>
    )
}

export default AddAnimeForm;