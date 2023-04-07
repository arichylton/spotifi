import { useEffect, useState } from 'react';
import { getArtist } from '../spotify';
import { useParams } from 'react-router-dom';
import { catchErrors } from '../utils/index';
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
        <div className='d-flex flex-column align-items-center justify-content-center mt-3'>
          <div className='d-flex flex-column align-items-center '>
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
          <div className='d-flex mt-4 fs-2 font-monospace gap-5 me-5'>
            <div className='flex-column d-flex align-items-center text-danger fw-bold'>
              {artist.followers.total}
              <span className='fs-6 text-secondary'>Followers</span>
            </div>
            <div className='d-flex align-items-center flex-column'>
              <ul className='d-flex flex-column align-items-center mb-1 p-0'>
                {artist.genres.map((genre, i) => {
                  return (
                    <li key={i} className='text-danger fw-bold'>
                     {genre}
                    </li>
                  );
                })}
              </ul>
              <span className='fs-6 text-secondary fw-bold'>Genres</span>
            </div>
            <div className='flex-column d-flex align-items-center text-danger fw-bold'>
              {artist.popularity}
              <span className='fs-6 text-secondary'>Popularity</span>
            </div>
          </div>
        </div>
      ) : (
        'HELLO'
      )}
    </div>
  );
};
export default Artist;
