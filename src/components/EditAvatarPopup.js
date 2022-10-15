import React from 'react';
import PopupWithForm from './PopupWithForm';

class EditAvatarPopup extends React.Component {
    constructor(props){
        super(props);
        this.inputRef = React.createRef();
    }

    handleSubmit = (e) => {
        e.preventDefault();
      
        this.props.onUpdateAvatar({
          avatar: this.inputRef.current.value
        });
      }

    render(){
        return (
            <PopupWithForm
              name="avatar-edit"
              title="Обновить аватар"
              isOpen={this.props.isOpen}
              onClose={this.props.onClose}
              onSubmit={this.handleSubmit}
            >
              <label className="popup__field">
                <input
                  required
                  type="url"
                  name="image"
                  minLength="2"
                  maxLength="200"
                  defaultValue=""
                  id="input-url"
                  className="popup__input popup__input_type_avatar-ref"
                  placeholder="Ссылка на картинку"
                  ref={this.inputRef}
                />
                <span className="input-url-error popup__error"></span>
              </label>
            </PopupWithForm>
        );
    }
}

export default EditAvatarPopup;