import React from 'react';
import '../../tracklist.css';

class PlaylistSong extends React.Component {
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.playlistSong.song}</h3>
          <p>{this.props.playlistSong.artist} | {this.props.playlistSong.album}</p>
        </div>
        <a className="Track-action">-</a>
      </div>
    );
  }
}

export default PlaylistSong;
