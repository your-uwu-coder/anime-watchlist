import {Link} from 'react-router-dom';
import '../components/Nav.css';
import {Navbar} from 'react-bootstrap';

const Nav = (props) => {

    return(
        <Navbar id="navbar" className="mx-auto d-flex justify-content-around p-4 border-bottom border-dark border-5" fixed="top" variant="dark" bg="light">
                <h1>📺<strong>Anime</strong>WatchList</h1>
                <div className='d-flex align-self-center gap-5'>            
                    <Link to="/dashboard" className=''>Home</Link>
                    <Link to="/watchlist">My Watch List</Link>
                </div>
        </Navbar>
    )
}

export default Nav;