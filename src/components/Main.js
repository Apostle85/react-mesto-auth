import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Card from "./Card";

class Main extends React.Component {
  static contextType = CurrentUserContext;

  constructor(props) {
    super(props);
    this.avatar = this.props.avatar;
  }

  render() {
    return (
      <main className="main page__element">
        <section className="profile main__section">
          <button
            className="profile__button profile__button_type-edit-avatar"
            onClick={this.props.onEditAvatar}
          >
            <img
              src={this.context.currentUser.avatar}
              alt="Изображение профиля"
              className="profile__avatar"
            />
          </button>
          <div className="profile__info">
            <h1 className="profile__title">{this.context.currentUser.name}</h1>
            <button
              type="button"
              className="profile__button profile__button_type_edit"
              onClick={this.props.onEditProfile}
            ></button>
            <p className="profile__subtitle">{this.context.currentUser.about}</p>
          </div>
          <button
            type="button"
            className="profile__button profile__button_type_add"
            onClick={this.props.onAddPlace}
          ></button>
        </section>
        <section className="elements main__section">
          <ul className="elements__container">
            { this.props.cards.map((card, i) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={this.props.onCardClick}
                onCardLike={this.props.onCardLike}
                onCardDelete={this.props.onCardDelete}
              ></Card>
            )) }
          </ul>
        </section>
      </main>
    );
  }
}

export default Main;
