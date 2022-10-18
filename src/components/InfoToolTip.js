import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

class InfoToolTip extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className={`popup popup_type_info ${
          this.props.isOpen && "popup_opened"
        }`}
      >
        <div className="popup__background"></div>
        <div className="popup__container">
          <button
            type="button"
            className="popup__button popup__button_type_close"
            onClick={this.props.onClose}
          ></button>
          <div className="popup__window">
            <div
              className={`popup__icon ${
                this.props.isCorrect
                  ? "popup__icon_type_correct"
                  : "popup__icon_type_incorrect"
              }`}
            ></div>
            <h2 className="popup__subtitle popup__subtitle_position_center">
              {this.props.message}
            </h2>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(InfoToolTip);
