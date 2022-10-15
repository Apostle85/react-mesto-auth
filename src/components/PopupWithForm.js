import React from "react";

class PopupWithForm extends React.Component {
  constructor(props) {
    super(props);
    this.name = props.name;
    this.title = props.title;
    this.children = props.children;
    this.onClose = props.onClose;
  }

  render() {
    return (
      <div
        className={`popup popup_type_${this.name} ${
          this.props.isOpen && "popup_opened"
        }`}
      >
        <div className="popup__background"></div>
        <div className="popup__container">
          <button
            type="button"
            className="popup__button popup__button_type_close"
            onClick={this.onClose}
          ></button>
          <form
            onSubmit={this.props.onSubmit}
            noValidate
            className="popup__form"
            name={`${this.name}-form`}
          >
            <h2 className="popup__subtitle">{this.title}</h2>
            {this.children}
            <button
              type="submit"
              className="popup__button popup__button_type_submit"
            >
              Сохранить
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default PopupWithForm;
