import {Link} from 'react-router-dom';

const Navbar = (props) => {

    return(
        <div className="w-75 mx-auto d-flex justify-content-between p-4">
            <h1>📺<strong>Anime</strong>WatchList</h1>
            <div className='d-flex align-self-center gap-5 text-decoration-none'>            
                <Link to="/" className=''>Home</Link>
                <Link to="/watchlist">My Watch List</Link>
            </div>
        </div>
    )
}

export default Navbar;