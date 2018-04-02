import React from 'react';
import '../../tracklist.css';

class ResultSong extends React.Component {
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.result.song}</h3>
          <p>{this.props.result.artist} | {this.props.result.album}</p>
        </div>
        <a className="Track-action">+</a>
      </div>
    );
  }
}

export default ResultSong;
