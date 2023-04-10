import { useEffect, useState } from 'react';
import { getUserInfo } from '../spotify';
import { catchErrors } from '../utils';
import { TailSpin } from 'react-loader-spinner';
import { Carousel } from 'react-responsive-carousel';
import TrackItem from './TrackItem';
import { useNavigate } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/user.css'

const User = ({ accessToken, chooseTrack }) => {
  const [user, setUser] = useState(null);
  const [followedArtists, setFollowedArtists] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [filteredPlaylist, setFilteredPlaylist] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState(null);
  const [savedTracks, setSavedTracks] = useState(null);
  const navigate = useNavigate();
  const handleOnClick = (playlist) => console.log(playlists.items[playlist].id);

  const handlePlay = (track) => {
    chooseTrack(track);
  };

  useEffect(() => {
    if (!accessToken) return;
    const fetchData = async () => {
      const { user, followedArtists, playlists, savedTracks, recentlyPlayed } =
        await getUserInfo(accessToken);
      setUser(user);
      setFollowedArtists(followedArtists);
      setPlaylists(playlists);

      setSavedTracks(savedTracks);
      setRecentlyPlayed(recentlyPlayed);
    };
    catchErrors(fetchData());
  }, [accessToken]);
  return (
    <div className='text-white mt-5 container'>
      {user ? (
        <div className='d-flex flex-column'>
          <div className='d-flex mt-3 mb-1 justify-content-around'>
            <div
              className='d-flex flex-column ms-3 gap-4'
              style={{ height: '30vh' }}
            >
              <img
                src={user.images[0].url}
                alt='Artist'
                className='rounded user__img'
                style={{
                  width: 260,
                  height: 260,
                  objectFit: 'cover',
                }}
              />
              <div className='d-flex flex-column gap-1'>
                <h1 className='fs-1 mb-4 fw-bold text-center'>
                  {user.display_name}
                </h1>
                <span className='text-muted fs-5 gap-3 d-flex justify-content-between align-items-center'>
                  Playlists:{' '}
                  <span style={{ color: '#1DB954' }}>{playlists.total}</span>
                </span>
                <span className='text-muted fs-5 d-flex justify-content-between align-items-center'>
                  Followed:{' '}
                  <span style={{ color: '#1DB954' }}>
                    {followedArtists.artists.items.length}
                  </span>
                </span>
                <span className='text-muted fs-5 d-flex justify-content-between align-items-center'>
                  Followers:{' '}
                  <span style={{ color: '#1DB954' }}>
                    {user.followers.total}
                  </span>
                </span>
              </div>
            </div>
            <div
              className='align-self-center mb-5 user__img'
              style={{ width: '35%' }}
            >
              {playlists ? (
                <Carousel
                  showArrows={true}
                  autoPlay={true}
                  showStatus={false}
                  infiniteLoop={true}
                  showThumbs={false}
                  onClickItem={(playlist, h) => handleOnClick(playlist, h)}
                >
                  {playlists.items
                    .filter((playlist) => {
                      if (playlist.images.length > 0) {
                        return playlist;
                      }
                    })
                    .map((playlist, i) => {
                      return (
                        <div key={i} style={{ cursor: 'pointer' }}>
                          <img
                            className='rounded'
                            src={
                              playlist.images.length > 0
                                ? playlist.images[0].url
                                : ''
                            }
                            alt='playlist'
                          />
                          <p className='fw-bold text-white legend'>
                            {playlist.name !== '  '
                              ? playlist.name
                              : 'Untitled'}
                          </p>
                        </div>
                      );
                    })}
                </Carousel>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className='d-flex gap-5 justify-content-center mt-5'>
            <div className='container'>
              <h2 className='mb-4 fw-bold'>Liked Songs</h2>
              {savedTracks.items.map((data, i) => {
                return (
                  <TrackItem
                    track={data.track}
                    handlePlay={handlePlay}
                    key={i}
                    size={'55'}
                    width={'40rem'}
                  />
                );
              })}
            </div>
            <div className='container'>
              <h2 className='mb-4 fw-bold'>Recently Played</h2>
              {recentlyPlayed.items.map((data, i) => {
                return (
                  <TrackItem
                    track={data.track}
                    handlePlay={handlePlay}
                    key={i}
                    size={'55'}
                    width={'40rem'}
                  />
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div
          className='container d-flex justify-content-center align-items-center'
          style={{ height: '60vh' }}
        >
          <TailSpin
            height='60'
            width='60'
            color='#1DB954'
            ariaLabel='tail-spin-loading'
            radius='1'
            wrapperStyle={{}}
            wrapperClass=''
            visible={true}
          />
        </div>
      )}
    </div>
  );
};
export default User;
