import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios';

const EditAnime = (props) => {
    const [anime, setAnime] = useState({
        title:"",
        episodes:"",
        synopsis: "",
        status: "",
        comment: ""
    })
    const [errors, setErrors] = useState({})
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

    const changeHandler = (e) => {
        setAnime(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }


    const updateHandler = (e) => {
        e.preventDefault();
        console.log(anime)
        axios.put(`http://localhost:8000/api/edit/${id}`, anime)
        .then((res) => {
            console.log(res.data)
            Navigate('/watchlist')
        })
        .catch((err) => {
            setErrors(err.response.data.errors)
        })
    }

    const deleteHandler = (id) => {
        axios.delete(`http://localhost:8000/api/deleteOne/${id}`)
        .then((res) => {
            Navigate('/')
        })
        .catch((err) => {
            console.log(err)
        })
    }



    return (
            <div className="w-25 mx-auto">
                <form onSubmit={updateHandler} className='border mb-5 w-100'>
                    <div className="text-content"> 
                        <h3 className='text-primary'> {anime.title} </h3>
                        <select className='form-select mb-3 w-25' onChange={changeHandler} name='status' value={anime.status}>
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
                        <textarea className='form-control w-50' onChange={e => setAnime({...anime, 'comment': e.target.value})}/>
                        <br/>
                        <button className='btn btn-secondary btn-sm mt-3' onClick={(e) => deleteHandler(anime._id)}>Update</button>
                    </div>
                </form>
                <h2>Reviews:</h2>
                <p>{anime.updatedAt}</p>
                <p>{anime.comment}</p>
            </div>
    )
}

export default EditAnime;