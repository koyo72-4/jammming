import React from 'react';
import TrackList from '../TrackList/TrackList';
import './ResultsList.css';

class ResultsList extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList
          tracks={this.props.results}
          isRemoval={false}
          onAdd={this.props.onAdd} />
      </div>
    );
  }
}

export default ResultsList;
