import { useState, useEffect } from 'react';
import { getTopArtistsMedium } from '../spotify/index';
import { catchErrors } from '../utils/index';

const UserTopArtists = ({ accessToken }) => {
  const [TopArtists, setTopArtists] = useState(null);
  const [ArtistLength, setArtistLength] = useState('AllTime');

  useEffect(() => {
    if (!accessToken) return;
    const fetchData = async () => {
      await getTopArtistsMedium(accessToken).then((artists) => {
        setTopArtists(artists.data);
      });
    };
    catchErrors(fetchData());
  }, [accessToken]);
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
                ArtistLength === 'AllTime' ? 'btn btn-primary' : 'btn btn-dark'
              }
              onClick={() => setArtistLength('AllTime')}
            >
              All Time
            </button>
          </li>
          <li className='list-item'>
            <button
              className={
                ArtistLength === 'Last6' ? 'btn btn-primary' : 'btn btn-dark'
              }
              onClick={() => setArtistLength('Last6')}
            >
              Last 6 months
            </button>
          </li>
          <li className='list-item'>
            <button
              className={
                ArtistLength === 'LastMonth'
                  ? 'btn btn-primary'
                  : 'btn btn-dark'
              }
              onClick={() => setArtistLength('LastMonth')}
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
                <img
                  src={artist.images[0].url}
                  style={{ height: '200px', width: '200px' }}
                  className='rounded-circle'
                  alt='top-track-img'
                />
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
