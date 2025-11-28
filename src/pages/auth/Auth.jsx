import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import amazonLogo from "../../assets/images/amazonLogo_auth.png";
import classes from "./auth.module.css";
import { auth } from "../../utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../components/dataprovider/DataProvider";
import { ClipLoader } from "react-spinners";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();

  const authHandler = async (e) => {
    e.preventDefault();
    if (e.target.name === "sign in") {
      // firebase auth sign in logic
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({ type: "SET_USER", user: userInfo.user });
          setLoading({ ...loading, signIn: false });
          navigate("/"); // go to home page
        })
        .catch((error) => {
          setError(error.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      // firebase auth sign up logic
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({ type: "SET_USER", user: userInfo.user });
          setLoading({ ...loading, signUp: false });
          navigate("/"); //go to home page
        })
        .catch((error) => {
          setError(error.message);
          setLoading({ ...loading, signUp: false });
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
            {loading.signIn ? (
              <ClipLoader size={15} color="#ffff" />
            ) : (
              "Sign In "
            )}
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
          {loading.signUp ? (
            <ClipLoader size={15} color="#ffff" />
          ) : (
            "create your Amazon account"
          )}
        </button>
        {error && <small className={classes.error}>{error}</small>}
      </div>
    </section>
  );
}

export default Auth;
