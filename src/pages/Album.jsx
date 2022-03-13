import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      artist: '',
      album: '',
      image: '',
      songList: [],
      favoriteSongs: [],
      loading: false,
    };
    this.handleFavoriteSongs = this.handleFavoriteSongs.bind(this);
  }

  async componentDidMount() {
    this.requestAlbum();
  }

  handleFavoriteSongs({ target: { checked } }, song) {
    this.setState({
      loading: true,
    }, async () => {
      if (checked) {
        await addSong(song);
        this.setState((prevState) => ({
          loading: false,
          favoriteSongs: [...prevState.favoriteSongs, song],
        }));
      }
    });
  }

  requestAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({
      loading: true,
    }, async () => {
      const result = await getMusics(id);
      this.setState({
        artist: result[0].artistName,
        album: result[0].collectionName,
        image: result[0].artworkUrl100,
        songList: result,
        loading: false,
      });
    });
  }

  render() {
    const { artist, album, image, songList, loading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          {loading ? <Loading />
            : (
              <div>
                <section>
                  <h2 data-testid="artist-name">{ artist }</h2>
                  <h3 data-testid="album-name">{ album }</h3>
                  <img src={ image } alt={ `${album}` } />
                </section>
                { songList.map((song, index) => {
                  if (index !== 0) {
                    return (
                      <div>
                        <MusicCard
                          song={ song }
                          key={ song.trackId }
                        />
                        <label htmlFor={ `favoriteSongs-${song.trackId}` }>
                          <input
                            id={ `favoriteSongs-${song.trackId}` }
                            type="checkbox"
                            name="favorite"
                            data-testid={ `checkbox-music-${song.trackId}` }
                            onChange={ (event) => this.handleFavoriteSongs(event, song) }
                            checked={ favoriteSongs
                              .some((favorites) => favorites.trackId === song.trackId) }
                          />
                          Favorita
                        </label>
                      </div>
                    );
                  } return '';
                })}
              </div>)}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }).isRequired,
};

export default Album;
