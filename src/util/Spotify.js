import { clientId, clientSecret } from './Secrets';

const redirectUri = 'http://localhost:2000/';
const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
let accessToken;
let expiresIn;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if (urlAccessToken && urlExpiresIn) {
      accessToken = urlAccessToken[1];
      expiresIn = urlExpiresIn[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      window.location = spotifyUrl;
    }
  },

  search(term) {
    accessToken = this.getAccessToken();
    console.log(accessToken);
    const searchUrl = `https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/search?type=track&q=${term.replace(' ', '%20')}`;
    return fetch(searchUrl, {
      headers: { Authorization: `Bearer: ${accessToken}` }
    })
    .then(response => response.json())
    .then(jsonResponse => {
      console.log(jsonResponse);
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artist[0].name,
            album: track.album.name,
            uri: track.uri
          };
        });
      } else {
        return [];
      }
    });
  },

  savePlaylist(playlistName, trackUris) {
    if (!playlistName || !trackUris || trackUris.length === 0) {
      return;
    }
    const userUrl = 'https://api.spotify.com/v1/me';
    const headers = {
      Authorization: `Bearer: ${accessToken}`
    };
    let userId;
    let playlistId;
    fetch(userUrl, {headers: headers})
    .then(response => response.json())
    .then(jsonResponse => {
      if (jsonResponse.id) {
        userId = jsonResponse.id;
      }
    })
    .then(() => {
      const createPlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
      fetch(createPlaylistUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer: ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: playlistName })
      })
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.id) {
          return playlistId = jsonResponse.id;
        }
      })
    })
    .then(() => {
      const addPlaylistTracksUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
      fetch(addPlaylistTracksUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer: ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uris: trackUris })
      });
    });
  }
};

export default Spotify;
