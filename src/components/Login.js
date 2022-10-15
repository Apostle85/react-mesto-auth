import React from "react";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputEmail: "",
      inputPassword: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  componentDidMount() {
    console.log("path: ", this.props.location.pathname);
  }

  onLogin = (event) => {
    this.props.onLogin(event, this.state.inputEmail, this.state.inputPassword);
  };

  render() {
    return (
      <main className="main page__element">
        <section className="login">
          <form
            onSubmit={this.onLogin}
            className="form login__form"
            name="login-form"
          >
            <h2 className="form__title">Вход</h2>
            <label className="form__field">
              <input
                value={this.state.inputEmail}
                onChange={this.handleChange}
                className="form__input"
                placeholder="Email"
                name="inputEmail"
                type="email"
              ></input>
            </label>
            <label className="form__field">
              <input
                value={this.state.inputPassword}
                onChange={this.handleChange}
                className="form__input"
                placeholder="Пароль"
                name="inputPassword"
                type="password"
              ></input>
            </label>
            <button type="submit" className="form__button">
              Войти
            </button>
          </form>
        </section>
      </main>
    );
  }
}

export default withRouter(Login);
