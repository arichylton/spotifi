import { Outlet, Link } from 'react-router-dom';
import { Fragment } from 'react';
import '../styles/navbar.css'

const Navbar = ({user}) => {
  return (
    <Fragment>
      <div className='navigation mb-4'>
        <Link to='/'>
          {user ? (
            <div className='logo-container'>
              <img
                src={user.images[0].url}
                alt='userIMG'
                className='rounded-circle me-4'
                style={{ width: 50 }}
              />
              <div className='text-white text-center fs-4 text-decoration-none '>
                {user.display_name}
              </div>
            </div>
          ) : (
            ''
          )}
        </Link>
        <div className='nav-links-container'>
          <Link className='text-white ps-4 fs-5' to='/tracks'>
            Songs
          </Link>
          <Link className='text-white ps-4 fs-5' to='/artists'>
            Artists
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
