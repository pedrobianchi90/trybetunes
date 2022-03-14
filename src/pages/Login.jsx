import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      buttonDisable: true,
      loading: false,
      userCreated: false,
    };
  }

  handleChange = ({ target }) => {
    const minLength = 3;
    const name = target.value;
    this.setState({
      userName: name,
    });
    if (name.length < minLength) {
      this.setState({ buttonDisable: true });
    } else {
      this.setState({ buttonDisable: false });
    }
  }

  async createUser() {
    const { userName } = this.state;
    this.setState({ loading: true });
    const response = await createUser({ name: userName });
    if (response) this.setState({ userCreated: true });
    this.setState({ loading: false });
  }

  render() {
    const { buttonDisable, loading, userCreated } = this.state;
    return (
      loading
        ? <Loading />
        : (
          <div>
            <h1 id="trybe-header">trybe</h1>
            <p id="tunes-header">tunes</p>
            <form data-testid="page-login" id="login-form">
              <input
                id="input-login-text"
                type="text"
                data-testid="login-name-input"
                placeholder="Insira seu usuário"
                onChange={ this.handleChange }
              />
              <button
                id="login-button"
                type="button"
                data-testid="login-submit-button"
                onClick={ () => this.createUser() }
                disabled={ buttonDisable }
              >
                Entrar
              </button>
              {userCreated && <Redirect to="/search" />}
            </form>
          </div>
        )
    );
  }
}

export default Login;
