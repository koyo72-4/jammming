import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Search by Song, Album, or Artist" />
        <a>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
