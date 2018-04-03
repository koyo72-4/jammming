import React from 'react';
import './SearchBar.css';
import { clientId } from '../../util/Secrets';

const redirectUri = 'http://localhost:2000';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { term: '' }

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }
  /*
  handleSearch(event) {
    this.props.login();
  }
  */

  search() {
    this.props.onSearch(this.state.term);
  }

  handleTermChange(event) {
    this.setState({ term: event.target.value });
  }

  render() {
    return (
      <div className="SearchBar">
        <input
          placeholder="Enter A Song Title"
          value={this.state.term}
          onChange={this.handleTermChange} />
        <a
          href={`https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user-read-private&response_type=token`}>
          SEARCH
        </a>
      </div>
    );
  }
}

export default SearchBar;
