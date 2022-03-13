import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
      searchResult: '',
      albunsList: [],
      buttonDisabled: true,
      loading: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handlechange = this.handlechange.bind(this);
  }

  handlechange({ target }) {
    const minimunLength = 2;
    this.setState({
      [target.name]: target.value,
    }, () => {
      const { searchInput } = this.state;
      const minimumLengthValidation = searchInput.length;
      this.setState({
        buttonDisabled: true,
      });
      if (minimumLengthValidation >= minimunLength) {
        this.setState({
          buttonDisabled: false,
        });
      }
    });
  }

  async handleClick() {
    this.setState({
      loading: true,
    });
    const { searchInput } = this.state;
    this.setState({
      searchResult: searchInput,
      buttonDisabled: true,
      loading: false,
    }, async () => {
      const result = await searchAlbumsAPI(searchInput);
      this.setState({
        albunsList: result,
        searchInput: '',
      });
    });
  }

  render() {
    const { searchInput, searchResult, albunsList, buttonDisabled, loading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            name="searchInput"
            placeholder="Nome do Artista"
            value={ searchInput }
            onChange={ this.handlechange }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            onClick={ this.handleClick }
            disabled={ buttonDisabled }
          >
            Procurar
          </button>
        </form>
        {loading && <Loading />}
        {!loading && albunsList.length === 0 && (
          <p>Nenhum álbum foi encontrado</p>
        )}
        {!loading
          && albunsList.length !== 0
            && (
              <div>
                <h3>{`Resultado de álbuns de: ${searchResult}`}</h3>
                <ul>
                  {albunsList.map((album) => (
                    <li key={ album.collectionId }>
                      <Link
                        to={ `/album/${album.collectionId}` }
                        data-testid={ `link-to-album-${album.collectionId}` }
                      >
                        <img
                          src={ album.artworkUrl100 }
                          alt={ `${album.collectionName} - ${album.artistName}` }
                        />
                        <p>{ album.collectionName }</p>
                        <p>{ album.artistName }</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
      </div>
    );
  }
}

export default Search;
