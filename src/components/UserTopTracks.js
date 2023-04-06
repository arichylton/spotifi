import { useState, useEffect } from 'react';
import { getTopTracksMedium } from '../spotify/index';
import { catchErrors } from '../utils/index';

const UserTopTracks = ({ accessToken, chooseTrack }) => {
  const [topTracks, setTopTracks] = useState(null);
  const [tracksLength, setTracksLength] = useState('AllTime');

    const handlePlay = (track) => {
      chooseTrack(track);
    };


  useEffect(() => {
    if (!accessToken) return;
    const fetchData = async () => {
      await getTopTracksMedium(accessToken).then((tracks) => {
        setTopTracks(tracks.data);   
      });
    };
    catchErrors(fetchData());
  }, [accessToken]);


  return (
    <div className='container'>
      <hr />
      <div className='text-white d-flex justify-content-between mb-4 mt-3'>
        <h1 className='mb-4 fw-bold'>Top Songs</h1>
        <ul
          className='d-flex text-decoration-none justify-content-around list-group-horizontal align-items-center fs-6'
          style={{ width: '30%' }}
        >
          <li className='list-item'>
            <button
              className={
                tracksLength === 'AllTime' ? 'btn btn-primary' : 'btn btn-dark'
              }
              onClick={() => setTracksLength('AllTime')}
            >
              All Time
            </button>
          </li>
          <li className='list-item'>
            <button
              className={
                tracksLength === 'Last6' ? 'btn btn-primary' : 'btn btn-dark'
              }
              onClick={() => setTracksLength('Last6')}
            >
              Last 6 months
            </button>
          </li>
          <li className='list-item'>
            <button
              className={
                tracksLength === 'LastMonth'
                  ? 'btn btn-primary'
                  : 'btn btn-dark'
              }
              onClick={() => setTracksLength('LastMonth')}
            >
              Last month
            </button>
          </li>
        </ul>
      </div>

      {topTracks ? (
        topTracks.items.map((track, i) => {
          return (
            <div
              className='d-flex m-2 align-items-center'
              style={{ cursor: 'pointer' }}
              key={track.uri}
              onClick={() => handlePlay(track)}
            >
              <img
                src={track.album.images[0].url}
                style={{ height: '64px', width: '64px' }}
                alt='top-track-img'
              />
              <div className='m-3'>
                <div className='text-white'>{track.name}</div>
                <div className='text-muted'>{track.artists[0].name}</div>
              </div>
            </div>
          );
        })
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
export default UserTopTracks;
