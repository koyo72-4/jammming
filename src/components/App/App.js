import React, { Component } from 'react';
import './App.css';
import ResultsList from '../ResultsList/ResultsList';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [
        {
          song: "Tinyyy Dancerrr",
          artist: "Elton John",
          album: "Madman Across The Water"
        },
        {
          song: "Second Song",
          artist: "Second Artist",
          album: "Second Album"
        }
      ],
      playlistSongs: [
        {
          song: "Supper's Ready",
          artist: "Genesis",
          album: "Foxtrot"
        },
        {
          song: "Second Song",
          artist: "Second Artist",
          album: "Second Album"
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <ResultsList results={this.state.results}/>
            <Playlist playlistSongs={this.state.playlistSongs}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
