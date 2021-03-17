import React, { useRef, useState } from "react";
import { auth } from "../firebase";
import "./SignUpScreen.css";

function SingUpScreen(email) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [signUp, setSignUp] = useState(false);
  const [loginEmail, setLoginEmail] = useState(email.email);

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {})
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {})
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="singUpScreen">
      {signUp ? (
        <form>
          <h1>Sign Up</h1>
          <input
            ref={emailRef}
            placeholder="Email"
            type="Email"
            defaultValue={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />

          <input ref={passwordRef} type="password" placeholder="Password" />
          <button type="submit" onClick={register}>
            Sign Up
          </button>
          <h4>
            <span
              className="singUpScreen__link"
              onClick={() => setSignUp(false)}
            >
              Go Back.
            </span>
          </h4>
        </form>
      ) : (
        <form>
          <h1>Sign In</h1>
          <input
            ref={emailRef}
            placeholder="Email"
            type="Email"
            defaultValue={loginEmail}
          />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <button type="submit" onClick={signIn}>
            Sign In
          </button>
          <h4>
            <span className="singUpScreen__gray">New to Netflix? </span>
            <span
              className="singUpScreen__link"
              onClick={() => setSignUp(true)}
            >
              Sign Up now.
            </span>
          </h4>
        </form>
      )}
    </div>
  );
}

export default SingUpScreen;
