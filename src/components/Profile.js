import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-node';

import Player from './Player';
import Dashboard from './Dashboard';
import UserTopArtists from './UserTopArtists';
import UserTopTracks from './UserTopTracks';
import useAuth from '../useAuth';
import Artist from './Artist';

const CLIENT_ID = '90a462053588436b95c0d6ad460a9878';
const spotifyApi = new SpotifyWebApi({
  clientId: CLIENT_ID,
});

const Profile = ({ code }) => {
  const [playingTrack, setPlayingTrack] = useState('');
  const [artistID, setArtistID] = useState('');
  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };
  const chooseArtist = (id) => {
    setArtistID(id);
  }

  const accessToken = useAuth(code);
  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={
            <Dashboard
              accessToken={accessToken}
              spotifyApi={spotifyApi}
              chooseTrack={chooseTrack}
            />
          }
        >
          <Route
            path='artists'
            element={
              <UserTopArtists
                accessToken={accessToken}
                chooseArtist={chooseArtist}
              />
            }
          />
          <Route
            path='tracks'
            element={
              <UserTopTracks
                chooseTrack={chooseTrack}
                accessToken={accessToken}
              />
            }
          />
          <Route
            path={`artist/:id`}
            element={<Artist accessToken={accessToken}/>}
          />
        </Route>
      </Routes>
      <div className='fixed-bottom'>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </div>
  );
};

export default Profile;
