import React from "react";
import spherePath from "../images/sphere.svg";
import spherePath2 from "../images/sphere2.svg";
import { Link, Route } from "react-router-dom";
import Spinner from "./Spinner";

const EntryUserForm = (props) => {
  return (
    <div
      className={`entry-user entry-user_type_${props.name} ${
        props.isOpen ? "entry-user_on" : ""
      }`}
    >
      <div className="entry-user__background">
        <img
          className="entry-user__background_item"
          src={spherePath}
          alt="background element"
        />
        <img
          className="entry-user__background_item"
          src={spherePath2}
          alt="background element"
        />
      </div>

      <div className="entry-user__container-form">
        <form
          onSubmit={props.onSubmit}
          className="entry-user__form"
          name={`${props.name}-user`}
        >
          <h2 className="entry-user__container-form-title">{props.title}</h2>
          {props.children}
          {props.isSpinnerFetching ? <Spinner /> : ""}
          <button
            className="entry-user__container-form-submit-button"
            type="submit"
            value={`${props.buttonOnText}`}
          >
            {`${props.buttonOnText}`}
          </button>
        </form>
        <Route path="/sign-up">
          <p className="entry-user_login-reminder">
            Already with us?&nbsp;
            <Link to="/sign-in" className="entry-user__login-reminder-link">
              Sign In.
            </Link>
          </p>
        </Route>
        <Route path="/sign-in">
          <p className="entry-user_login-reminder">
            Don't have an account?&nbsp;
            <Link to="/sign-up" className="entry-user__login-reminder-link">
              Create account
            </Link>
          </p>
        </Route>
      </div>
    </div>
  );
};
export default EntryUserForm;
