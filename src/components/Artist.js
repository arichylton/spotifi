import { useEffect, useState } from 'react';
import { getArtist } from '../spotify';
import { useParams } from 'react-router-dom';
import { catchErrors } from '../utils/index';
import { TailSpin } from 'react-loader-spinner';
import '../styles/artist.css';

const Artist = ({ accessToken }) => {
  const [artist, setArtist] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await getArtist(id, accessToken).then((artist) => {
        setArtist(artist.data);
      });
    };
    catchErrors(fetchData());
  }, []);

  return (
    <div className='text-white artist__page'>
      {artist ? (
        <div className='d-flex flex-column align-items-center justify-content-center mt-3 w-100'>
          <div className='d-flex flex-column align-items-center'>
            <img
              src={artist.images[0].url}
              alt='Artist'
              className='rounded-circle'
              style={{ width: 300, height: 300, objectFit: 'cover' }}
            />
            <span className='font-monospace mt-4' style={{ fontSize: 80 }}>
              {artist.name}
            </span>
          </div>
          <div className='d-flex align-items-center justify-content-between mt-4 fs-3 font-monospace gap-5 w-50'>
            <div className='flex-column d-flex align-items-center text-danger fs-4 fw-bold w-100'>
              {artist.followers.total.toLocaleString('en-US')}
              <span className='fs-6 text-secondary'>Followers</span>
            </div>
            <div className='d-flex align-items-center flex-column w-100'>
              <ul className='d-flex flex-column align-items-center mb-1 p-0 text-center'>
                {artist.genres.map((genre, i) => {
                  return (
                    <li key={i} className='text-danger fw-bold fs-4'>
                      {genre}
                    </li>
                  );
                })}
              </ul>
              <span className='fs-6 text-secondary fw-bold'>Genres</span>
            </div>
            <div className='flex-column d-flex align-items-center text-danger  fs-4 fw-bold w-100'>
              {artist.popularity}
              <span className='fs-6 text-secondary'>Popularity</span>
            </div>
          </div>
        </div>
      ) : (
        <TailSpin
          height='80'
          width='80'
          color='#1DB954'
          ariaLabel='tail-spin-loading'
          radius='1'
          wrapperStyle={{}}
          wrapperClass=''
          visible={true}
        />
      )}
    </div>
  );
};
export default Artist;
