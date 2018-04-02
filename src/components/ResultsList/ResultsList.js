import React from 'react';
import ResultSong from '../ResultSong/ResultSong';
import './ResultsList.css';

class ResultsList extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <div className="TrackList">
          {
            this.props.results.map(result => {
              return (
                <ResultSong
                  key={result.song}
                  result={result} />
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default ResultsList;
