import React from 'react';
import { Link } from 'react-router-dom';

class AlbumCard extends React.Component {
  render() {
    return (
      <Link data-testid={`link-to-album-${collectionId}`} />
      <div>.</div>
    );
  }
}

export default AlbumCard;
