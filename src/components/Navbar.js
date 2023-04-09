import { Outlet, Link } from 'react-router-dom';
import { Fragment } from 'react';
import spotifyLogo from '../assets/Spotify_Logo_RGB_Green.png'
import '../styles/navbar.css';

const Navbar = () => {
  return (
    <Fragment>
      <div className='navigation container mb-5 pt-5'>
        <Link to='/'>
          <div className='logo-container'>
            <img src={spotifyLogo} alt='userIMG' style={{ width: 140 }} />
          </div>
        </Link>
        <div className='nav-links-container'>
          <Link className='text-white ps-4 fs-5' to='/tracks'>
            Songs
          </Link>
          <Link className='text-white ps-4 fs-5' to='/artists'>
            Artists
          </Link>
          <Link className='text-white ps-4 fs-5' to='/playlists'>
            Playlists
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
