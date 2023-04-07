import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getTopArtistsShort,
  getTopArtistsMedium,
  getTopArtistsLong,
} from '../spotify';
import { catchErrors } from '../utils/index';

const UserTopArtists = ({ accessToken, chooseArtist }) => {
  const [TopArtists, setTopArtists] = useState(null);
  const [ArtistLength, setArtistLength] = useState('long');

  useEffect(() => {
    if (!accessToken) return;
    const fetchData = async () => {
      if (ArtistLength === 'long') {
        await getTopArtistsLong(accessToken).then((artists) => {
          setTopArtists(artists.data);
        });
      } else if (ArtistLength === 'medium') {
        await getTopArtistsMedium(accessToken).then((artists) => {
          setTopArtists(artists.data);
        });
      } else {
        await getTopArtistsShort(accessToken).then((artists) => {
          setTopArtists(artists.data);
        });
      }
    };
    catchErrors(fetchData());
  }, [accessToken, ArtistLength]);
  return (
    <div className='container'>
      <hr />
      <div className='text-white d-flex justify-content-between mb-4 mt-3'>
        <h1 className='mb-4 fw-bold'>Top Artists</h1>
        <ul
          className='d-flex text-decoration-none justify-content-around list-group-horizontal align-items-center fs-6'
          style={{ width: '30%' }}
        >
          <li className='list-item'>
            <button
              className={
                ArtistLength === 'long' ? 'btn btn-primary' : 'btn btn-dark'
              }
              onClick={() => setArtistLength('long')}
            >
              All Time
            </button>
          </li>
          <li className='list-item'>
            <button
              className={
                ArtistLength === 'medium' ? 'btn btn-primary' : 'btn btn-dark'
              }
              onClick={() => setArtistLength('medium')}
            >
              Last 6 months
            </button>
          </li>
          <li className='list-item'>
            <button
              className={
                ArtistLength === 'short' ? 'btn btn-primary' : 'btn btn-dark'
              }
              onClick={() => setArtistLength('short')}
            >
              Last month
            </button>
          </li>
        </ul>
      </div>

      <div className='row justify-content-md-center'>
        {TopArtists ? (
          TopArtists.items.map((artist, i) => {
            return (
              <div
                className='d-flex m-4 align-items-center flex-column col'
                style={{ cursor: 'pointer' }}
                key={artist.uri}
              >
                <Link to={`/artist/${artist.id}`}>
                  <img
                    src={artist.images[0].url}
                    style={{ height: '200px', width: '200px', objectFit: 'cover'  }}
                    className='rounded-circle'
                    alt='top-track-img'
                  />
                </Link>

                <div className='m-3'>
                  <div className='text-white'>{artist.name}</div>
                </div>
              </div>
            );
          })
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};
export default UserTopArtists;
