import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/Main.css'
import { Link, useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router-dom';

const Main = (props) => {
    const Navigate = useNavigate();
    const [allAnime, setAllAnime] = useState([]);

    //display all anime api list
    useEffect(() => {
        axios.get('https://api.jikan.moe/v4/anime?limit=20', {withCredentials:true})
            .then((animeList) => {
                setAllAnime(animeList.data.data)
                // console.log(animeList.data.data)
            })
            .catch ((err) => {
                console.log(err)
                setAllAnime([])
                Navigate("/login")
            })
    }, [])

    return (
        <div className='bg-img'>
            <div className='d-flex flex-wrap mx-auto' id="animecontainer">
                {
                    allAnime.map((anime) => { return (
                            <div key={anime.mal_id} className="card">
                                <img src={anime.images.jpg.image_url} className="card-img-top h-75" alt="Anime"/>
                                    <div className="card-body d-flex align-items-center justify-content-between">
                                        <p>{anime.title}</p>
                                        <div className="d-flex justify-content-end">
                                            <Link to={`/addanimeform/${anime.mal_id}`} className='btn btn-primary'>View</Link>
                                        </div>
                                    </div>
                            </div>
                    )})
                }

            </div>
        </div>
    )
}

export default Main;

