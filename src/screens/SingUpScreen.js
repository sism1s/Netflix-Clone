import React, { useRef } from "react";
import { auth } from "../firebase";
import "./SingUpScreen.css";

function SingUpScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const singIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="singUpScreen">
      <form>
        <h1>Sing In</h1>
        <input ref={emailRef} placeholder="email" type="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button type="submit" onClick={singIn}>
          Sing In
        </button>
        <h4>
          <span className="singUpScreen__gray">New to Netflix? </span>
          <span className="singUpScreen__link" onClick={register}>
            Sing Up now.
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SingUpScreen;
