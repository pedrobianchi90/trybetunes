import React from 'react';
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
      <header data-testid="header-component">
        <h1>Trybetunes</h1>
        <p data-testid="header-user-name">{ user.name }</p>
      </header>
    );
  }
}

export default Header;
