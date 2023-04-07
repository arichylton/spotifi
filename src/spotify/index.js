import axios from 'axios';

export const getUser = (token) =>
  axios.get('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

// TOP TRACKS //////////////////////////////////////////////////////////////////
export const getTopTracksLong = (token) =>
  axios.get(
    'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term',
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

export const getTopTracksMedium = (token) =>
  axios.get(
    'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term',
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

export const getTopTracksShort = (token) =>
  axios.get(
    'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term',
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

// TOP ARTISTS /////////////////////////////////////////////////////////////////
export const getTopArtistsLong= (token) =>
  axios.get(
    'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term',
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

export const getTopArtistsMedium = (token) =>
  axios.get(
    'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term',
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

export const getTopArtistsShort = (token) =>
  axios.get(
    'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term',
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

// SINGLE ARTIST ////////////////////////////////////////////////////////////////
export const getArtist = (id, token) =>
  axios.get(`https://api.spotify.com/v1/artists/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });