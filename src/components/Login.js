import React from "react";
import EntryUserForm from "./EntryUserForm";

const Login = (props) => {
  const [emailInput, setEmailInput] = React.useState("");
  function handleEmailChange(e) {
    setEmailInput(e.target.value);
  }
  const [passwordInput, setPasswordInput] = React.useState("");
  function handlePasswordChange(e) {
    setPasswordInput(e.target.value);
  }

  function handlerSubmitLogin(e) {
    e.preventDefault();

    props.onUpdater({
      email: emailInput,
      password: passwordInput,
    });
  }

  return (
    <EntryUserForm
      name="login"
      title="Sign In."
      buttonOnText="Sign In."
      onSubmit={handlerSubmitLogin}
      isLoginOpen={props.isLoginOpen}
      isSpinnerFetching={props.onFetching}
    >
      <input
        onChange={handleEmailChange}
        value={emailInput || ""}
        id="email-input"
        className="entry-user__container-form-input_email"
        type="email"
        name="email"
        placeholder="Email"
        minLength="3"
        maxLength="40"
        required
      />
      <input
        onChange={handlePasswordChange}
        value={passwordInput || ""}
        id="password-input"
        className="entry-user__container-form-input_password"
        type="password"
        name="password"
        placeholder="Password"
        minLength="6"
        maxLength="50"
        required
      />
    </EntryUserForm>
  );
};

export default Login;
