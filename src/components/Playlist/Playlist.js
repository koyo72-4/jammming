import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.changeName = this.changeName.bind(this);
  }

  changeName(event) {
    this.props.changeName(event.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input
          value={this.props.playlistName}
          onChange={this.changeName} />
        <TrackList
          tracks={this.props.playlistSongs}
          isRemoval={true}
          onRemove={this.props.onRemove} />
        <a
          className="Playlist-save"
          onClick={this.props.onSave}>
          SAVE TO SPOTIFY
        </a>
      </div>
    );
  }
}

export default Playlist;
