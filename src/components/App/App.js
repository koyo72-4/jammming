import React, { Component } from 'react';
import './App.css';
import ResultsList from '../ResultsList/ResultsList';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      playlistSongs: [],
      playlistName: 'New Playlist'
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.changePlaylistName = this.changePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    this.state.playlistSongs.forEach(song => {
      if (song.id === track.id) {
        return;
      }
    });
    this.state.playlistSongs.push(track);
    this.setState({ playlistSongs: this.state.playlistSongs });
    console.log(this.state.playlistSongs);
  }

  removeTrack(track) {
    let newPlaylist = this.state.playlistSongs.filter(song => song.id !== track.id);
    this.setState({ playlistSongs: newPlaylist });
    console.log(this.state.playlistSongs);
  }

  changePlaylistName(newName) {
    this.setState({ playlistName: newName });
  }

  savePlaylist() {
    let trackURIs = this.state.playlistSongs.map(song => song.uri);
    console.log(`trackURIs: ${trackURIs}`);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(playlistId => {
      console.log('playlist: ' + this.state.playlistSongs);
      this.setState({ playlistName: 'New Playlist', playlistSongs: [] });
    });
  }

  search(term) {
    Spotify.search(term).then(tracks => {
      console.log(term);
      this.setState({ results: tracks });
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar
            login={this.login}
            onSearch={this.search} />
          <div className="App-playlist">
            <ResultsList
              results={this.state.results}
              onAdd={this.addTrack} />
            <Playlist
              playlistSongs={this.state.playlistSongs}
              playlistName={this.state.playlistName}
              onRemove={this.removeTrack}
              changeName={this.changePlaylistName}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
