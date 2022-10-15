import React from "react";
import { Link, withRouter } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        inputEmail: "",
        inputPassword: ""
    };
  }

  componentDidMount() {
    console.log("path: ", this.props.location.pathname);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <main className="main page__element">
        <section className="register">
          <form
            className="form register__form"
            name="register-form"
            onSubmit={(event) =>
              this.props.onRegister(
                event,
                this.state.inputEmail,
                this.state.inputPassword
              )
            }
          >
            <h2 className="form__title">Регистрация</h2>
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
              Зарегистрироваться
            </button>
            <Link to="sign-in" className="form__ref">
              Уже зарегистрированы? Войти
            </Link>
          </form>
        </section>
      </main>
    );
  }
}

export default withRouter(Register);
