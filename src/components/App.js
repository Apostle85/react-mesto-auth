import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import headerLogo from "../images/__logo.svg";
// import profileAvatar from "../images/profile__avatar.jpg";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import { phraseMistake, phraseLoginCorrect, phraseRegisterCorrect } from "../utils/constants";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoToolTip from "./InfoToolTip";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      token: "",
      email: "",
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isInfoToolTipOpen: false,
      messageInfoToolTip: '',
      isCorrect: false,
      selectedCard: {},
      currentUser: {},
      cards: [],
    };
  }
  //-------------------
  // Слушатели событий
  //-------------------

  //#region Слушатели событий
  componentDidMount() {
    this.tokenCheck();
  }

  getLoggedInfo = () => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then((values) => {
        const data = values[0];
        const initialCards = values[1];

        // Получение информации о пользователе и начального набора карточек с сервера
        this.setState({
          currentUser: {
            name: data.name,
            about: data.about,
            _id: data._id,
            avatar: data.avatar,
          },
          cards: initialCards,
        });
      })
      .catch((err) => {
        // Если произошла ошибка иного рода, ловим ее через catch
        console.log(err);
      });
  };

  handleCardClick = (card) => {
    this.setState({ selectedCard: card });
  };

  handleEditAvatarClick = () => {
    this.setState({ isEditAvatarPopupOpen: true });
  };

  handleEditProfileClick = () => {
    this.setState({ isEditProfilePopupOpen: true });
  };

  handleAddPlaceClick = () => {
    this.setState({ isAddPlacePopupOpen: true });
  };

  handleInfoToolTipOpen = () => {
    this.setState({ isInfoToolTipOpen: true });
  };

  closeAllPopups = () => {
    this.setState({
      isAddPlacePopupOpen: false,
      isEditProfilePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isInfoToolTipOpen: false,
      selectedCard: {},
    });
  };

  handleUpdateUser = (data) => {
    api
      .editUserInfo(data.name, data.about)
      .then((newData) => {
        this.setState({
          currentUser: newData,
        });
        this.closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleUpdateAvatar = (data) => {
    api
      .editUserAvatar(data.avatar)
      .then((newData) => {
        this.setState({
          currentUser: {
            name: newData.name,
            about: newData.about,
            _id: newData._id,
            avatar: newData.avatar,
          },
        });
        this.closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(
      (like) => like._id === this.state.currentUser._id
    );

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        this.setState({
          cards: this.state.cards.map((el) =>
            el._id === card._id ? newCard : el
          ),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then((newCard) => {
        this.setState({
          cards: this.state.cards.filter((el) => el._id !== card._id),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onAddPlace = (newCard) => {
    api
      .addCard(newCard)
      .then((newCard) => {
        this.setState({
          cards: [newCard, ...this.state.cards],
        });
        this.closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onRegister = (event, email, password) => {
    event.preventDefault();
    // if (password === confirmPassword) {
    api
      .register(email, password)
      .then((res) => {
        console.log(res);
        this.setState(
          {
            messageInfoToolTip: phraseRegisterCorrect,
            isCorrect: true,
            isInfoToolTipOpen: true,
          },
          () => {
            this.props.history.push("/sign-in");
          }
        );
      })
      .catch((err) =>
          this.setState(
            {
              messageInfoToolTip: phraseMistake,
              isCorrect: false,
              isInfoToolTipOpen: true,
            },
            () => console.log(err)
          )
        );
  };

  onLogin = (event, email, password) => {
    event.preventDefault();
    console.log("email && password: ", email, " ", password);
    if (email && password) {
      api
        .login(email, password)
        .then((res) => {
          if (res.token) {
            this.setState(
              {
                messageInfoToolTip: phraseLoginCorrect,
                isCorrect: true,
                isInfoToolTipOpen: true,
                email: email,
                loggedIn: true,
                token: res.token,
              },
              () => {
                localStorage.setItem("token", res.token);
                this.props.history.push("/");
                this.getLoggedInfo();
              }
            );
          } else {
          }
        })
        .catch((err) =>
          this.setState(
            {
              messageInfoToolTip: phraseMistake,
              isCorrect: false,
              isInfoToolTipOpen: true,
            },
            () => console.log(err)
          )
        );
    } else {
      this.setState({
        messageInfoToolTip: phraseMistake,
        isCorrect: false,
        isInfoToolTipOpen: true,
      });
    }
  };

  tokenCheck = () => {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена
    const token = localStorage.getItem("token");
    if (token) {
      // проверим токен
      api
        .loginByToken(token)
        .then((res) => {
          if (res) {
            console.log(res.data.email);
            this.setState(
              {
                loggedIn: true,
                email: res.data.email,
              },
              () => {
                this.props.history.push("/");
                this.getLoggedInfo();
              }
            );
          } else {
            this.setState({
              messageInfoToolTip: phraseMistake,
              isCorrect: false,
              isInfoToolTipOpen: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  onSignOut = (event) => {
    event.preventDefault();

    this.setState(
      {
        email:'',
        loggedIn: false,
      },
      () => {
        localStorage.removeItem("token");
        this.props.history.push("/sign-in");
      }
    );
  };

  //#endregion

  render() {
    return (
      <CurrentUserContext.Provider value={this.state}>
        <div className="App">
          <div className="page">
            <Header
              logo={headerLogo}
              loggedIn={this.state.loggedIn}
              email={this.state.email}
              onSignOut={this.onSignOut}
            ></Header>
            <Switch>
              <ProtectedRoute
                component={Main}
                avatar={this.state.profileAvatar}
                cards={this.state.cards}
                onEditProfile={this.handleEditProfileClick}
                onAddPlace={this.handleAddPlaceClick}
                onEditAvatar={this.handleEditAvatarClick}
                onCardClick={this.handleCardClick}
                onCardLike={this.handleCardLike}
                onCardDelete={this.handleCardDelete}
                exact
                path="/"
                isLogged={this.state.loggedIn}
              ></ProtectedRoute>
              <Route path="/sign-up">
                <Register onRegister={this.onRegister}></Register>
              </Route>
              <Route path="/sign-in">
                <Login onLogin={this.onLogin}></Login>
              </Route>
            </Switch>
            {this.state.loggedIn && <Footer></Footer>}
            <InfoToolTip
              message={this.state.messageInfoToolTip}
              onClose={this.closeAllPopups}
              isOpen={this.state.isInfoToolTipOpen}
              isCorrect={this.state.isCorrect}
            ></InfoToolTip>
            {/* Profile-Edit popup */}
            <EditProfilePopup
              onUpdateUser={this.handleUpdateUser}
              isOpen={this.state.isEditProfilePopupOpen}
              onClose={this.closeAllPopups}
            />
            {/* Avatar-Edit popup */}
            <EditAvatarPopup
              onUpdateAvatar={this.handleUpdateAvatar}
              isOpen={this.state.isEditAvatarPopupOpen}
              onClose={this.closeAllPopups}
            />
            {/* Card-Add popup */}
            <AddPlacePopup
              onAddPlace={this.onAddPlace}
              isOpen={this.state.isAddPlacePopupOpen}
              onClose={this.closeAllPopups}
            ></AddPlacePopup>
            {/* Card-Delete popup */}
            <PopupWithForm
              name="card-delete"
              title="Вы уверены?"
              onClose={this.closeAllPopups}
            >
              <button
                type="submit"
                className="popup__button popup__button_type_submit"
              >
                Да
              </button>
            </PopupWithForm>
            {/* Photo popup */}
            {this.state.selectedCard && (
              <ImagePopup
                card={this.state.selectedCard}
                onClose={this.closeAllPopups}
              ></ImagePopup>
            )}
          </div>
        </div>
      </CurrentUserContext.Provider>
    );
  }
}

export default withRouter(App);
