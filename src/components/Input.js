import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

class Input extends React.Component {
  static contextType = CurrentUserContext;

  constructor(props) {
    super(props);

    this.state = {
      name: "",
    };
  }

  componentDidUpdate() {
      if(this.props.shouldRemember){
    if (
      !this.context.isEditProfilePopupOpen &&
      this.props.name === "title" &&
      this.state.name !== this.context.currentUser.name
    ) {
      this.setState({
        name: this.context.currentUser.name,
      });
    }

    if (
      !this.context.isEditProfilePopupOpen &&
      this.props.name === "subtitle" &&
      this.state.name !== this.context.currentUser.about
    ) {
      this.setState({
        name: this.context.currentUser.about,
      });
    }
  }
}

  handleChangeName = (event) => {
    console.log("state name:", this.state.name);
    this.setState({ name: event.target.value });
  };

  render() {
    return (
      <label className="popup__field">
        <input
          value={this.state.name || ""}
          onChange={this.handleChangeName}
          required
          type={this.props.type || "text"}
          name={this.props.name}
          minLength={this.props.minLength || null}
          maxLength={this.props.maxLength || null}
          id={this.props.id}
          className={this.props.className}
          placeholder={this.props.placeholder}
        />
        <span className={`${this.props.name}-error popup__error`}></span>
      </label>
    );
  }
}

export default Input;
