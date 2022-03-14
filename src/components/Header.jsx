import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  async getUserName() {
    const user = await getUser();
    this.setState({ user, loading: false });
  }

  render() {
    const { user, loading } = this.state;
    return loading ? <Loading /> : (
      <header data-testid="header-component" id="header">
        <div className="header-1">
          <h1 id="trybetunes">Trybetunes</h1>
          <h2 data-testid="header-user-name">{ user.name }</h2>
        </div>
        <ul className="header-2">
          <li><Link to="/search" data-testid="link-to-search">Busca</Link></li>
          <li><Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link></li>
          <li><Link to="/profile" data-testid="link-to-profile">Perfil</Link></li>
        </ul>
      </header>
    );
  }
}

export default Header;
