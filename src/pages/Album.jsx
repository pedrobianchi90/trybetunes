import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

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
      } else {
        await removeSong(song);
        this.setState((prevState) => ({
          loading: false,
          favoriteSongs: prevState.favoriteSongs.filter((favorite) => (
            favorite.trackId !== song.trackId
          )),
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
      const favorite = await getFavoriteSongs();
      this.setState({
        artist: result[0].artistName,
        album: result[0].collectionName,
        image: result[0].artworkUrl100,
        songList: result,
        loading: false,
        favoriteSongs: favorite,
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
                  <img src={ image } alt={ `${album}` } id="album-image" />
                  <h2 data-testid="album-name" id="album-title">{ album }</h2>
                  <h4 data-testid="artist-name" id="artist-title">{ artist }</h4>
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
                            className="favorite-checkbox"
                            id={ `favoriteSongs-${song.trackId}` }
                            type="checkbox"
                            name="favorite"
                            data-testid={ `checkbox-music-${song.trackId}` }
                            onChange={ (event) => this.handleFavoriteSongs(event, song) }
                            checked={ favoriteSongs
                              .some((favorites) => favorites.trackId === song.trackId) }
                          />
                          {/* Favorita */}
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
