import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setIsSignInForm((prev) => !prev);
  };
  return (
    <div className="relative">
      <Header />

      <form className="absolute w-4/12 mt-52 mx-auto right-0 left-0 p-16 text-white flex flex-col bg-black bg-opacity-80">
        <h1 className="font-bold text-3xl my-6">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="my-5 p-4 bg-slate-600 rounded-lg"
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="my-5 p-4 bg-slate-600 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          className="my-5 p-4 bg-slate-600 rounded-lg"
        />
        <button className="p-4 my-5 bg-red-700 rounded-md">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="my-8">
          {isSignInForm ? "New to Netflix? " : "Already have an Account? "}
          <span onClick={toggleSignInForm} className="cursor-pointer">
            {isSignInForm ? "Sign Up Now" : "Sign In Here"}
          </span>
        </p>
      </form>

      <div className="">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          alt="a wall of movies"
        />
      </div>
    </div>
  );
};

export default Login;
