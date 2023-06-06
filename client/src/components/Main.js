import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/Main.css'
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
// import { useParams } from 'react-router-dom';

const Main = (props) => {
    const Navigate = useNavigate();
    const [allAnime, setAllAnime] = useState([]);
    const [pageNum, setPageNum] = useState(0)

    
    //display all anime api list
    useEffect(() => {
        axios.get('https://api.jikan.moe/v4/anime')
            .then((animeList) => {
                setAllAnime(animeList.data.data)
                console.log(animeList)
            })
            .catch ((err) => {
                console.log(err)
                setAllAnime([])
                Navigate("/login")
            })
    }, [])

    const animePerPage = 20
    const pagesVisited = pageNum * animePerPage
    const displayAnime = allAnime.slice(pagesVisited, pagesVisited + animePerPage).map((anime) =>
    { return (
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

    // ceil is rounding up
    const pageCount = Math.ceil(allAnime.length / animePerPage);

    const changePage = ({selected}) => {
        setPageNum(selected)
    }

    // TODO: Continue project from here (SearchBar begins)
    return (
        <>

        <div>
            <input 
                type="search" 
                placeholder="Search for an anime.."
                required
            />

        </div>
        <div className='bg-img'>
            <div className='d-flex flex-wrap mx-auto' id="animecontainer">
                {displayAnime}
            </div>
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                />
        </div>
        </>
    )
}

export default Main;

