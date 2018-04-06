import { clientId, clientSecret } from './Secrets';

const redirectUri = window.location.href;
const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      console.log('accessToken saved:', accessToken);
      return accessToken;
    }
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if (urlAccessToken && urlExpiresIn) {
      accessToken = urlAccessToken[1];
      const expiresIn = Number(urlExpiresIn[1]);
      console.log(accessToken);
      console.log(expiresIn);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      window.location = spotifyUrl;
    }
    return accessToken;
  },

  search(term) {
    const accessToken = this.getAccessToken();
    console.log("access token received by search method: ", accessToken);
    const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    const headers = { Authorization: `Bearer ${accessToken}` };
    return fetch(searchUrl, {headers})
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(jsonResponse => {
      console.log(jsonResponse);
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          };
        });
      } else {
        return [];
      }
    });
  },

/*
  savePlaylist(playlistName, trackUris) {
    const accessToken = this.getAccessToken();
    console.log("access token received by savePlaylist method: ", accessToken);
    if (!playlistName || !trackUris || trackUris.length === 0) {
      return;
    }
    const userUrl = 'https://api.spotify.com/v1/me';
    const headers = {
      Authorization: `Bearer: ${accessToken}`
    };
    let userId;
    let playlistId;
    return fetch(userUrl, {headers: headers})
    .then(response => {
      console.log('first fetch response: ' + response);
      console.log('userUrl: ' + userUrl);
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.id) {
        userId = jsonResponse.id;
      }
    })
    .then(() => {
      const createPlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
      return fetch(createPlaylistUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer: ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: playlistName })
      })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(jsonResponse => {
        if (jsonResponse.id) {
          return playlistId = jsonResponse.id;
        }
      })
    })
    .then(() => {
      const addPlaylistTracksUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
      return fetch(addPlaylistTracksUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer: ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uris: trackUris })
      });
    });
  }
  */
    savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    //let userId;

    return fetch('https://api.spotify.com/v1/me', {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
      // take just the user ID returned by Spotify
      const userId = jsonResponse.id;

      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name}) // sending the name of the playlist with a key 'name'
      }).then(response => response.json()
      ).then(jsonResponse => {
        // got a playlist id for the new playlist that was just created from spotify
        const playlistId = jsonResponse.id;

        // ready to send the tracks to spotify for the stored playlist
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    });
  }
};

export default Spotify;
