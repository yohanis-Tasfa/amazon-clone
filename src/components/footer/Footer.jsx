// src/components/footer/Footer.jsx
import React from "react";
import classes from "./Footer.module.css";
import { Link } from "react-router-dom";
import amazonLogo from "../../assets/images/amazonLogo.png";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      {/* Back to top */}
      <div className={classes.backToTop}>
        <span
          onClick={() => {
            window.scrollTo({
              top: 0,
              //   behavior: "smooth", // ← smooth scroll (feels premium)
            });
          }}
          style={{ cursor: "pointer" }}
        >
          Back to top
        </span>
      </div>

      {/* Main Footer Links - 4 Columns */}
      <div className={classes.footerLinks}>
        <div className={classes.column}>
          <h3>Get to Know Us</h3>
          <ul>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">About Amazon</a>
            </li>
            <li>
              <a href="#">Investor Relations</a>
            </li>
            <li>
              <a href="#">Amazon Devices</a>
            </li>
            <li>
              <a href="#">Amazon Science</a>
            </li>
          </ul>
        </div>

        <div className={classes.column}>
          <h3>Make Money with Us</h3>
          <ul>
            <li>
              <a href="#">Sell products on Amazon</a>
            </li>
            <li>
              <a href="#">Sell on Amazon Business</a>
            </li>
            <li>
              <a href="#">Sell apps on Amazon</a>
            </li>
            <li>
              <a href="#">Become an Affiliate</a>
            </li>
            <li>
              <a href="#">Advertise Your Products</a>
            </li>
            <li>
              <a href="#">Self-Publish with Us</a>
            </li>
            <li>
              <a href="#">Host an Amazon Hub</a>
            </li>
          </ul>
        </div>

        <div className={classes.column}>
          <h3>Amazon Payment Products</h3>
          <ul>
            <li>
              <a href="#">Amazon Business Card</a>
            </li>
            <li>
              <a href="#">Shop with Points</a>
            </li>
            <li>
              <a href="#">Reload Your Balance</a>
            </li>
            <li>
              <a href="#">Amazon Currency Converter</a>
            </li>
          </ul>
        </div>

        <div className={classes.column}>
          <h3>Let Us Help You</h3>
          <ul>
            <li>
              <a href="#">Amazon and COVID-19</a>
            </li>
            <li>
              <a href="#">Your Account</a>
            </li>
            <li>
              <a href="#">Your Orders</a>
            </li>
            <li>
              <a href="#">Shipping Rates & Policies</a>
            </li>
            <li>
              <a href="#">Returns & Replacements</a>
            </li>
            <li>
              <a href="#">Manage Your Content and Devices</a>
            </li>
            <li>
              <a href="#">Help</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className={classes.footerBottom}>
        <div className={classes.bottomContainer}>
          <div className={classes.logo}>
            <img src={amazonLogo} alt="Amazon" />
            {/* If you don't have white logo, use text */}
            {/* <span>amazon</span> */}
          </div>

          <div className={classes.languageSelect}>
            <select defaultValue="en">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>

        {/* Copyright & Links */}
        <div className={classes.copyright}>
          <div className={classes.links}>
            <a href="#">Conditions of Use</a>
            <a href="#">Privacy Notice</a>
            <a href="#">Your Ads Privacy Choices</a>
          </div>
          <p>
            &copy; {new Date().getFullYear()} Yohanis tasfa. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
