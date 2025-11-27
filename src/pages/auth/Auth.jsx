import React from "react";
import { Link } from "react-router-dom";
import amazonLogo from "../../assets/images/amazonLogo_auth.png";
import classes from "./auth.module.css";

function Auth() {
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
            <input type="email" id="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <button className={classes.signin_button}>Sign In</button>
        </form>

        {/* agreement  */}
        <p>
          By signing-in you agree to Amazon fake clone Conditions of Use & Sale.
          Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        {/* create account button */}

        <button className={classes.create_account_button}>
          Create your Amazon Account
        </button>
      </div>
    </section>
  );
}

export default Auth;
