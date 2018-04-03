import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction() {
    let clickAction;
    let symbol;
    if (this.props.isRemoval) {
      clickAction = this.removeTrack;
      symbol = '-';
    } else {
      clickAction = this.addTrack;
      symbol = '+';
    }
    return (
      <a
        className="Track-action"
        onClick={clickAction}>
        {symbol}
      </a>
    );
  }

  addTrack(event) {
    console.log(this.props.track);
    this.props.onAdd(this.props.track);
  }

  removeTrack(event) {
    console.log(this.props.track);
    this.props.onRemove(this.props.track);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
