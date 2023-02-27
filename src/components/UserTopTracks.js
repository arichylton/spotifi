import { useState, useEffect } from 'react';
import { getTopTracksMedium } from '../spotify/index';
import { catchErrors } from '../utils/index';

const UserTopTracks = ({ accessToken, chooseTrack }) => {
  const [topTracks, setTopTracks] = useState(null);

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
    <div >
      <hr />
      <h1 className='text-white mb-4'>Top Tracks (3 months)</h1>

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
