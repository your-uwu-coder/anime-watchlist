import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './AllAnime.css'
import { Link, useNavigate } from 'react-router-dom';

const AllAnime = props => {
    const [data, setData] = useState([])
    const Navigate = useNavigate()


    // get request with useEffect
    useEffect(()=>{
        axios.get('http://localhost:8000/api/allAnime', {withCredentials:true})
            .then((res) =>{
                setData(res.data)
            })
            .catch((err) => {
                console.log('directing to login page..')
                setData([])
                Navigate("/login")
            }
    )}, []
)

    const deleteHandler = (id) => {
        console.log("deleted", id)
        axios.delete(`http://localhost:8000/api/deleteOne/${id}`)
            // console.log(`${id}`)
            .then((res) => {
            })
            .catch((err) => {
                console.log(err)
            })
    }


    return(
        <div id="anime-table" className='w-25 mx-auto'>
            <h2 className='fw-bold'>My Watch List:</h2> 
                <table className='table'>
                    <thead>
                        <tr>
                            <td>Title</td>
                            <td>Status</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                {
                    data.map((anime, idx) => (
                    <tr key={idx}>
                        <td>{anime.title}</td> 
                        <td>{anime.status}</td>
                        <td><Link to={`/edit/${anime._id}`}>
                                <button type="button" className='btn btn-light btn-sm me-3' >Edit</button>
                            </Link>
                            <button onClick={(e) => deleteHandler(anime._id)}  className='btn btn-danger btn-sm'>Delete</button>
                        </td>
                    </tr>
                    )
                )
                }
                    </tbody>
                </table>
            
        </div>
    )
}

export default AllAnime;