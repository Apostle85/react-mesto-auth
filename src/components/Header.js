import React from "react";
import { Switch,Route,Link, withRouter } from "react-router-dom";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="header page__element">
        <img
          src={this.props.logo}
          className="header__logo"
          alt="Логотип 'Mesto Russia'"
        />
        {this.props.loggedIn ? (
          <div>
            <span className="header__text">{this.props.email}</span>
            <Link
              to="/sign-in"
              onClick={this.props.onSignOut}
              className="header__ref header__ref_color_gray"
            >
              Выйти
            </Link>
          </div>
        ) : (
          <Switch>
            <Route path="/sign-in">
              <Link className="header__ref" to="/sign-up">
                Регистрация
              </Link>
            </Route>
            <Route path="/sign-up">
              <Link className="header__ref" to="/sign-in">
                Войти
              </Link>
            </Route>
          </Switch>
        )}
      </header>
    );
  }
}

export default withRouter(Header);
