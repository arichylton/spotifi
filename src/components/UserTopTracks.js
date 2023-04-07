import { useState, useEffect } from 'react';
import {
  getTopTracksShort,
  getTopTracksMedium,
  getTopTracksLong,
} from '../spotify/index';
import { catchErrors } from '../utils/index';

const UserTopTracks = ({ accessToken, chooseTrack }) => {
  const [topTracks, setTopTracks] = useState(null);
  const [tracksLength, setTracksLength] = useState('long');

  const handlePlay = (track) => {
    chooseTrack(track);
  };

  useEffect(() => {
    if (!accessToken) return;
    const fetchData = async () => {
      console.log(tracksLength);
      if (tracksLength === 'long') {
        await getTopTracksLong(accessToken).then((tracks) => {
          setTopTracks(tracks.data);
        });
      } else if (tracksLength === 'medium') {
        await getTopTracksMedium(accessToken).then((tracks) => {
          setTopTracks(tracks.data);
        });
      } else {
        await getTopTracksShort(accessToken).then((tracks) => {
          setTopTracks(tracks.data);
        });
      }
    };
    catchErrors(fetchData());
  }, [accessToken, tracksLength]);

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
                tracksLength === 'long' ? 'btn btn-primary' : 'btn btn-dark'
              }
              onClick={() => setTracksLength('long')}
            >
              All Time
            </button>
          </li>
          <li className='list-item'>
            <button
              className={
                tracksLength === 'medium' ? 'btn btn-primary' : 'btn btn-dark'
              }
              onClick={() => setTracksLength('medium')}
            >
              Last 6 months
            </button>
          </li>
          <li className='list-item'>
            <button
              className={
                tracksLength === 'short'
                  ? 'btn btn-primary'
                  : 'btn btn-dark'
              }
              onClick={() => setTracksLength('short')}
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
