import { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import axios from 'axios';
import useAuth from './useAuth';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackSearchResult from './TrackSearchResult';
import { catchErrors } from './utils';
import Player from './Player';
import { getUser } from './spotify';
import UserTopTracks from './components/UserTopTracks';
import Navbar from './components/Navbar';

const CLIENT_ID = '90a462053588436b95c0d6ad460a9878';

const spotifyApi = new SpotifyWebApi({
  clientId: CLIENT_ID,
});

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [user, setUser] = useState(null);
  const [lyrics, setLyrics] = useState('');

  const chooseTrack = (track) => {
    setPlayingTrack(track);
    setSearch('');
  };

  useEffect(() => {
    if (!accessToken) return;
    const fetchData = async () => {
      await getUser(accessToken).then((user) => {
        setUser(user.data);
      });
    };
    catchErrors(fetchData());
  }, [accessToken]);

  useEffect(() => {
    if (!playingTrack) return;
    axios
      .get('http://localhost:3001/lyrics', {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [playingTrack]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    let cancel = false;
    spotifyApi.searchTracks(search, { limit: 12 }).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <Container className='d-flex flex-column py-2'>
      <Navbar />
      <div className='text-white f-lg mb-4'>
        {user ? user.display_name : ''}
      </div>
      <Form.Control
        type='search'
        placeholder='Search Songs/Artists'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className='flex-grow-1 my-2' style={{ overflowY: 'auto' }}>
        {searchResults.map(
          (track) => (
            console.log(track),
            (
              <TrackSearchResult
                key={track.uri}
                track={track}
                chooseTrack={chooseTrack}
              />
            )
          )
        )}
        {searchResults.length === 0 && (
          <div className='text-center text-white' style={{ whiteSpace: 'pre' }}>
            {lyrics}
          </div>
        )}
      </div>
      <div>
        <UserTopTracks accessToken={accessToken} chooseTrack={chooseTrack} />
      </div>
      <div className='fixed-bottom'>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </Container>
  );
};
export default Dashboard;
