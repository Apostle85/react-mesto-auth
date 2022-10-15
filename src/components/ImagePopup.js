import React from "react";
class ImagePopup extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(){
    this.link = this.props.card.link;
    this.name = this.props.card.name;
  }

  render() {
    return (
      <div className={`popup popup_type_photo${ this.props.card.link? ' popup_opened':'' }`}>
        <div className="popup__background popup__background_type_photo"></div>
        <div className="popup__container popup__container_type_photo">
          <button
            type="button"
            className="popup__button popup__button_type_close"
            onClick={this.props.onClose}
          ></button>
          <img className="popup__image" alt={this.props.card.name || this.name} src={ this.props.card.link || this.link || undefined } />
          <h2 className="popup__photo-description">{this.props.card.name || this.name}</h2>
        </div>
      </div>
    );
  }
}

export default ImagePopup;
