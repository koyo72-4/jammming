import React from 'react';
import './Playlist.css';
import PlaylistSong from '../PlaylistSong/PlaylistSong';

class Playlist extends React.Component {
  render() {
    return (
      <div className="Playlist">
        <input value='New Playlist' />
        <div className="TrackList">
          {
            this.props.playlistSongs.map(playlistSong => {
              return (
                <PlaylistSong
                  key={playlistSong.song}
                  playlistSong={playlistSong} />
              );
            })
          }
        </div>
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>




    );
  }
}

export default Playlist;
