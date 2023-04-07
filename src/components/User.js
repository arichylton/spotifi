import { useEffect, useState } from 'react';
import { catchErrors } from '../utils';
import { Audio } from 'react-loader-spinner';

const User = ({ user }) => {
  useEffect(() => {
    console.log(user);
  })

  return (
    <div className='text-white mt-5'>
      {user ? (
        <div className='d-flex flex-column align-items-center justify-content-center mt-3'>
          <div className='d-flex flex-column align-items-center '>
            <img
              src={user.images[0].url}
              alt='Artist'
              className='rounded-circle'
              style={{ width: 150, height: 150, objectFit: 'cover' }}
            />
            <span className='font-monospace mt-4' style={{ fontSize: 60 }}>
              {user.display_name}
            </span>
          </div>
          <div className='d-flex mt-4 fs-2 font-monospace gap-5 me-5'>
            <div className='flex-column d-flex align-items-center text-danger fw-bold'>
              {user.followers.total}
              <span className='fs-6 text-secondary'>Followers</span>
            </div>
            <div className='d-flex align-items-center flex-column'>
              <span className='fs-6 text-secondary fw-bold'>Genres</span>
            </div>
            <div className='flex-column d-flex align-items-center text-danger fw-bold'>
              {user.popularity}
              <span className='fs-6 text-secondary'>Popularity</span>
            </div>
          </div>
        </div>
      ) : (
        <Audio
          height='80'
          width='80'
          radius='9'
          color='green'
          ariaLabel='loading'
          wrapperStyle
          wrapperClass
        />
      )}
    </div>
  );
};
export default User;
