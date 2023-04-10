import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import spotifyLogo from '../assets/Spotify_Logo_RGB_Green.png'
import '../styles/navbar.css';

const Navbar = () => {
  return (
    <Fragment>
      <nav className='navigation container mb-5 pt-5 '>
        <Link to='/'>
          <div className='logo-container'>
            <img src={spotifyLogo} alt='userIMG' style={{ width: 140 }} />
          </div>
        </Link>
        <div className='nav-links-container shift fs-5'>
          <Link className='text-white ps-4 shift-item' to='/tracks'>
            Songs
          </Link>
          <Link className='text-white ps-4 shift-item' to='/artists'>
            Artists
          </Link>
          <Link className='text-white ps-4 shift-item' to='/playlists'>
            Playlists
          </Link>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
