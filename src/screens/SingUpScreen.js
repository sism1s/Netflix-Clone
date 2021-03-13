import React from "react";
import "./SingUpScreen.css";

function SingUpScreen() {
  return (
    <div className="singUpScreen">
      <form>
        <h1>Sing In</h1>
        <input placeholder="email" type="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Sing In</button>
        <h4>
          {" "}
          <span className="singUpScreen__gray">New to Netflix?</span>
          <span className="singUpScreen__link">Sing Up now.</span>
        </h4>
      </form>
    </div>
  );
}

export default SingUpScreen;
