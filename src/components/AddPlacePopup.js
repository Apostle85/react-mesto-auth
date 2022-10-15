import React from "react";
import PopupWithForm from "./PopupWithForm";
import Input from './Input';

class AddPlacePopup extends React.Component {
  constructor(props) {
    super(props);
  }

  handleAddPlaceSubmit = (e) => {
    e.preventDefault();
    this.props.onAddPlace({ name: e.target.title.value, link: e.target.image.value });
  };

  render() {
    return (
      <PopupWithForm
        name="card-add"
        title="Новое место"
        isOpen={this.props.isOpen}
        onClose={this.props.onClose}
        onSubmit={this.handleAddPlaceSubmit}
      >
        <Input
          name="title"
          minLength="2"
          maxLength="30"
          id="input-name"
          className="popup__input popup__input_type_card-name"
          placeholder="Название"
        ></Input>
        <Input
          type="url"
          name="image"
          id="input-add-url"
          className="popup__input popup__input_type_card-ref"
          placeholder="Ссылка на картинку"
        ></Input>
      </PopupWithForm>
    );
  }
}

export default AddPlacePopup;
