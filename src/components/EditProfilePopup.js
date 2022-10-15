import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";

class EditProfilePopup extends React.Component {
  static contextType = CurrentUserContext;

  constructor(props) {
    super(props);
  }

  handleSubmit = (e) => {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    this.props.onUpdateUser({
      name: e.target.title.value,
      about: e.target.subtitle.value,
    });
  };

  render() {
    return (
      <PopupWithForm
        name="profile-edit"
        title="Редактировать профиль"
        isOpen={this.props.isOpen}
        onClose={this.props.onClose}
        onSubmit={this.handleSubmit}
      >
        <Input
          name="title"
          minLength="2"
          maxLength="40"
          id="input-title"
          className="popup__input popup__input_type_title"
          placeholder="Имя"
          shouldRemember
        ></Input>
        <Input
          name="subtitle"
          minLength="2"
          maxLength="200"
          id="input-subtitle"
          className="popup__input popup__input_type_subtitle"
          placeholder="О себе"
          shouldRemember
        ></Input>
      </PopupWithForm>
    );
  }
}

export default EditProfilePopup;
