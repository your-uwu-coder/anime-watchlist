import {Link, useNavigate} from 'react-router-dom';
import '../components/Nav.css';
import {Navbar} from 'react-bootstrap';
import axios from 'axios';
import { userContext } from '../context/UserContext';
import React, { useContext } from 'react';


const Nav = (props) => {
    const Navigate = useNavigate();
    const { loggedInUser, setLoggedInUser } = useContext(userContext)

    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials:true})
            .then((res) => {
                console.log('logged out..')
                window.localStorage.removeItem('uuid')
                Navigate('/login')
                setLoggedInUser({ _id: null })
            })
            .catch((err) => {
                console.log(err)
            }) 
    }
    return(
        <Navbar className="mx-auto d-flex justify-content-around p-4 border-bottom border-dark border-5" fixed="top" bg="light">
                <h1>📺<strong>Anime</strong>WatchList</h1>
                <div className='d-flex align-items-center gap-5'>            
                    <Link to="/dashboard" id="link">Dashboard</Link>
                    <Link to="/allanime" id="link">My Watch List</Link>


                    {
                        !loggedInUser._id ?
                        <button>
                            <Link to={'/login'} className="p-1 btn btn-outline-secondary btn-sm">Login</Link>
                        </button> :
                        <button onClick={logout} className="p-1 btn btn-outline-secondary btn-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                            <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                        </svg> Logout</button>

                    }

                </div>
        </Navbar>
    )
}

export default Nav;