import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    const { artistName } = this.state;
    const minLenght = 2;
    const enabled = artistName.length >= minLenght;
    return (
      <div data-testid="page-search">
        <Header />
        <h2>Search</h2>
        <form>
          <input
            data-testid="search-artist-input"
            name="artistName"
            type="text"
            value={ artistName }
            onChange={ this.handleChange }
            placeholder="Nome do Artista"
          />
        </form>
        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ !enabled }
        >
          Procurar
        </button>
      </div>
    );
  }
}

export default Search;
