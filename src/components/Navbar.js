import { Outlet, Link } from 'react-router-dom';
import { Fragment } from 'react';
import '../styles/navbar.css'

const Navbar = () => {
  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          Spotifi
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/tracks'>
            Songs
          </Link>
          <Link className='nav-link' to='/artists'>
            Artists
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
