import { clientId, clientSecret } from './Secrets';

const redirectUri = 'http://localhost:2000/';
const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
let accessToken;
let expiresIn;

const Spotify = {
  /*
  login() {
    return fetch(`https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user-read-private&response_type=token`).then(response => response.json()).then(jsonResponse => {
      return console.log(jsonResponse);
    });
  }
  */
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
    const searchUrl = `https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/search?type=track&q=${term.replace(' ', '%20')}`;
    return fetch(searchUrl, {
      headers: { Authorization: `Bearer: ${accessToken}` }
    })
    .then(response => response.json())
    .then(jsonResponse => {
      console.log(jsonResponse);
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.map(track => {
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
  }
};

export default Spotify;
