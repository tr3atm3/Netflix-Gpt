import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  //hooks
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef("");
  const name = useRef("");
  const password = useRef("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //handling button clicks
  const toggleSignInForm = () => {
    setIsSignInForm((prev) => !prev);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    //validating the form inputs in validate.js
    const message = checkValidateData(
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);
    if (message) {
      return;
    }

    //sign in |sign up logic
    if (!isSignInForm) {
      //sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
          })
            .then(() => {
              // Profile updated!
              // ...
              const { uid, displayName, email } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  displayName: displayName,
                  email: email,
                })
              );

              navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              // ...
              setErrorMessage(error.message);
            });
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    }
  };

  //jsx returned
  return (
    <div className="relative">
      <Header />

      <form
        className="absolute w-5/12 mt-52 mx-auto right-0 left-0 p-12 text-white flex flex-col bg-black bg-opacity-80"
        onSubmit={handleFormSubmit}
      >
        <h1 className="font-bold text-3xl my-2">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="my-2 p-3 bg-slate-600 rounded-lg"
            ref={name}
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="my-2 p-3 bg-slate-600 rounded-lg"
          ref={email}
        />
        <input
          type="password"
          placeholder="Password"
          className="my-2 p-3 bg-slate-600 rounded-lg"
          ref={password}
        />
        <p className="text-red-600 my-1">{errorMessage}</p>
        <button type="submit" className="p-3 my-2 bg-red-700 rounded-md">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="mt-4">
          {isSignInForm ? "New to Netflix? " : "Already have an Account? "}
          <span onClick={toggleSignInForm} className="cursor-pointer">
            {isSignInForm ? "Sign Up Now" : "Sign In Here"}
          </span>
        </p>
      </form>

      <div className="h-[100vh]">
        <img
          className="h-[100%] w-[100%]"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          alt="a wall of movies"
        />
      </div>
    </div>
  );
};

export default Login;
