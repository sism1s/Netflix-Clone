import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import Nav from "../Nav";
import "./ProfileScreen.css";
import PlansScreen from "./PlansScreen";
// import { isNotSubscribed } from "../actions";

function ProfileScreen() {
  const user = useSelector(selectUser);
  // const sub = useSelector((state) => state.sub);
  // const dispatch = useDispatch();

  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen__body">
        <h1>Edit Profile</h1>
        <div className="profileScreen__info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="avatar"
          />
          <div className="profileScreen__details">
            <h2>{user.email}</h2>
            <div className="profileScreen__plans">
              <h3>Plans</h3>
              <PlansScreen />
              <button
                // onClick={() => dispatch(isNotSubscribed())}
                onClick={() => auth.signOut()}
                className="profileScreen__signOut"
              >
                {" "}
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
