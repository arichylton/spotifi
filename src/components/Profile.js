import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-node';

import Dashboard from './Dashboard';
import UserTopArtists from './UserTopArtists';
import UserTopTracks from './UserTopTracks';
import useAuth from '../useAuth';

const CLIENT_ID = '90a462053588436b95c0d6ad460a9878';
const spotifyApi = new SpotifyWebApi({
  clientId: CLIENT_ID,
});

const Profile = ({ code }) => {
  const [playingTrack, setPlayingTrack] = useState('');
  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

  const accessToken = useAuth(code);
  return (
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
        <Route path='artists' element={<UserTopArtists />} />
        <Route
          path='tracks'
          element={
            <UserTopTracks
              chooseTrack={chooseTrack}
              accessToken={accessToken}
            />
          }
        />
      </Route>
    </Routes>
  );
};

export default Profile;
