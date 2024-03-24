import React, { useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO_URL, USERICON_URL } from "../utils/constants";
const Header = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));

        // ...
        navigate("/browse");
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate("/");
      }
    });

    // unsubscribe when the componenet unmount
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  return (
    <div className="px-8 w-full py-4 bg-gradient-to-b from-black absolute flex justify-between align-middle">
      <img className="w-32" src={LOGO_URL} alt="Logo" />

      {user && (
        <div className="flex align-middle h-10">
          <p>{user.displayName}</p>
          <img className="rounded-lg" src={USERICON_URL} alt="usericon" />
          <button onClick={handleSignOut} className="ml-4 font-bold ">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
