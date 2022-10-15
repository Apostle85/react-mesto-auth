import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

class Card extends React.Component {
  static contextType = CurrentUserContext;

  constructor(props) {
    super(props);
  }

  handleClick = () => {
    this.props.onCardClick(this.props.card);
  };

  handleLikeClick = () => {
    this.props.onCardLike(this.props.card);
  }

  handleDeleteClick = () => {
    this.props.onCardDelete(this.props.card);
  }

  render() {
    return (
      <li className="element">
        <img
          src={this.props.card.link}
          className="element__photo"
          onClick={this.handleClick}
          alt={this.props.card.name}
        />
        {this.props.card.owner._id === this.context.currentUser._id && (
          <button onClick={this.handleDeleteClick} type="button" className="element__delete"></button>
        )}
        <div className="element__info">
          <h2 className="element__title">{this.props.card.name}</h2>
          <div className="element__like-container">
            <button
              type="button"
              onClick={this.handleLikeClick}
              className={`element__like ${
                this.props.card.likes.some(
                  (like) => like._id === this.context.currentUser._id
                ) && 'element__like_active'
              }`}
            ></button>
            <p className="element__like-counter">
              {this.props.card.likes.length}
            </p>
          </div>
        </div>
      </li>
    );
  }
}

export default Card;
