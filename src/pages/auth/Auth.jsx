import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import amazonLogo from "../../assets/images/amazonLogo_auth.png";
import classes from "./auth.module.css";
import { auth } from "../../utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../components/dataprovider/DataProvider";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  const [{ user }, dispatch] = useContext(DataContext);

  const authHandler = async (e) => {
    e.preventDefault();
    if (e.target.name === "sign in") {
      // firebase auth sign in logic
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({ type: "SET_USER", user: userInfo.user });
        })
        .catch((error) => {
          console.error("Error signing in:", error);
        });
    } else {
      // firebase auth sign up logic
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({ type: "SET_USER", user: userInfo.user });
        })
        .catch((error) => {
          console.error("Error signing up:", error);
        });
    }
  };

  return (
    <section className={classes.login}>
      {/* Logo  */}

      <Link to={"/"}>
        <img src={amazonLogo} alt="amazon logo" />
      </Link>

      {/* FORM  */}

      <div className={classes.login__container}>
        <h1>Sign-In</h1>
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            name="sign in"
            onClick={authHandler}
            className={classes.signin_button}
          >
            Sign In
          </button>
        </form>

        {/* agreement  */}
        <p>
          By signing-in you agree to Amazon fake clone Conditions of Use & Sale.
          Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        {/* create account button */}

        <button
          type="submit"
          name="sign up"
          onClick={authHandler}
          className={classes.create_account_button}
        >
          Create your Amazon Account
        </button>
      </div>
    </section>
  );
}

export default Auth;
