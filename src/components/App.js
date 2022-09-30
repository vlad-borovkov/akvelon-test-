/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { CurrentUserContext } from "./../contexts/CurrentUserContext";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import "./../index.css";
import { api } from "../utils/Api";
import * as auth from "../utils/Auth";
import Main from "./Main";
import Footer from "./Footer";
import Register from "./Register";
import Login from "./Login";
import FailRegistrationPopup from "./FailRegistrationPopup";
import SuccessRegistrationPopup from "./SuccessRegistrationPopup";
import ProtectedRoute from "./ProtectedRoute";
import ImagePopup from "./ImagePopup";
import Header from "./Header";
import PageNotFound from "./PageNotFound";
const App = () => {
  //  open-close windows
  const closeAllPopups = () => {
    setFailRegistrationPopupOpen(false);
    setSuccessRegistrationPopupOpen(false);
  };
  const handleCloseGallery = () => {
    onGalleryPopup(false);
    setSelectedCard({});
    history.push("/");
  };
  // popups registration allerts
  const [isSuccessRegistrationPopupOpen, setSuccessRegistrationPopupOpen] =
    React.useState(false);
  const pushSuccessRegistration = () => {
    setSuccessRegistrationPopupOpen(!isSuccessRegistrationPopupOpen);
  };
  const [isFailRegistrationPopupOpen, setFailRegistrationPopupOpen] =
    React.useState(false);
  const pushFailRegistration = () => {
    setFailRegistrationPopupOpen(!isFailRegistrationPopupOpen);
  };
  const [isPopupErrorMessage, setPopupErrorMessage] = React.useState("");

  // Spinner logical
  const [isSpinnerFetching, setSpinnerFetching] = React.useState(false);
  const gettingData = () => {
    setSpinnerFetching(true);
  };
  const stopGettingData = () => {
    setSpinnerFetching(false);
  };

  // user registration
  const [userId, getCurrentUserId] = React.useState("");

  function handlerSubmitRegister(registerValue) {
    gettingData();
    auth
      .register(registerValue)
      .then((data) => {
        if (data.error) {
          stopGettingData();
          setPopupErrorMessage(data.error);
          pushFailRegistration();
        }
        return data;
      })
      .then((data) => {
        console.log(data);
        if (data.id) {
          stopGettingData();
          getCurrentUserId(data.id); // getcurrent user id
          pushSuccessRegistration();
          history.push("/sign-in");
        }
      })
      .catch((err) => {
        console.log(`Упс, ошибка ${err}`);
      });
  }

  // user authorization, auth state for protected route
  const [loggedIn, setLoggedIn] = React.useState(false);
  function handlerSubmitLogin(registerValue) {
    gettingData();
    auth
      .authorize(registerValue)
      .then((data) => {
        if (data.message) {
          setPopupErrorMessage(data.message);
          pushFailRegistration();
        }
        return data;
      })
      .then((data) => {
        if (data) {
          localStorage.setItem("jwt", data.token);
          return data;
        }
      })
      .then((data) => {
        if (data.token) {
          stopGettingData();
          setLoggedIn(true);
        }
      })
      .then(() => history.push("/"))
      .catch((err) => {
        console.log(`Упс, ошибка ${err}`);
      });
  }

  // getting user and put them in global state, render when get auth
  const [currentUser, setCurrentUser] = React.useState([]);
  React.useEffect(() => {
    if (loggedIn) {
      api
        .getUserValue(userId)
        .then((data) => {
          console.log(data.data);
          setCurrentUser(data.data);
        })
        .catch((err) => {
          console.log(`Упс, ошибка ${err}`);
        });
    }
  }, [loggedIn]);

  function handleLogOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  // opening user person window and close
  const [isGalleryPopupOpen, onGalleryPopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const handleClickOnCard = (card) => {
    history.push(`/users/${card.id}`);
    onGalleryPopup(true);
    setSelectedCard(card);
  };

  const history = useHistory();

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        {loggedIn ? <Header onLogOut={handleLogOut} /> : ""}
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onClose={closeAllPopups}
            handleClickOnCard={handleClickOnCard}
          />
          <ProtectedRoute
            path={`/users/${selectedCard.id}`}
            loggedIn={loggedIn}
            component={ImagePopup}
            onClose={closeAllPopups}
            clickedCard={selectedCard}
            closePopup={handleCloseGallery}
            isOpen={isGalleryPopupOpen}
            handleLogOut={handleLogOut}
          />
          <Route path="/sign-up">
            <Register
              onUpdater={handlerSubmitRegister}
              onFetching={isSpinnerFetching}
            />
          </Route>
          <Route path="/sign-in">
            <Login
              onUpdater={handlerSubmitLogin}
              onFetching={isSpinnerFetching}
            />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        <SuccessRegistrationPopup
          isOpen={isSuccessRegistrationPopupOpen}
          onClose={closeAllPopups}
        />

        <FailRegistrationPopup
          isOpen={isFailRegistrationPopupOpen}
          onClose={closeAllPopups}
          errorMessage={isPopupErrorMessage}
        />
      </CurrentUserContext.Provider>
      <Footer />
    </div>
  );
};

export default App;
