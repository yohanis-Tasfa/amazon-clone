import React, { useContext } from "react";
import classes from "./Header.module.css";
import amazonLogo from "../../assets/images/amazonLogo.png";
import americanLogo from "../../assets/images/americanimage.png";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { DataContext } from "../dataprovider/DataProvider";
import { auth } from "../../utility/firebase";

function Header() {
  const [{ user, basket }] = useContext(DataContext);

  const total = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  return (
    <section className={classes.fixed}>
      <div className={classes.header__container}>
        <div className={classes.logo__container}>
          <Link to="/">
            <img src={amazonLogo} alt="amazon logo" />
          </Link>
          <div className={classes.delivery}>
            <span>
              <SlLocationPin />
            </span>
            <div>
              <p>Delivered to</p>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>

        <div className={classes.search}>
          <select>
            <option value="">All</option>
          </select>
          <input type="text" placeholder="Search product" />
          <BsSearch size={42} />
        </div>

        <div className={classes.order__container}>
          <a href="#" className={classes.language}>
            <img src={americanLogo} alt="" />
            <select>
              <option value="">EN</option>
            </select>
          </a>

          {user ? (
            <div
              className={`${classes.accountBox}`}
              onClick={() => auth.signOut()}
              style={{ cursor: "pointer" }}
            >
              <p>Hello, {user?.email?.split("@")[0]}</p>
              <span>Sign Out</span>
            </div>
          ) : (
            <Link to="/auth" className={classes.accountBox}>
              <div>
                <p>Hello, Sign in</p>
                <span>Account & Lists</span>
              </div>
            </Link>
          )}

          <Link to="/orders">
            <p>Returns</p>
            <span>& Orders</span>
          </Link>

          <Link to="/cart" className={classes.cart}>
            <BiCart size={35} />
            <span>{total}</span>
          </Link>
        </div>
      </div>

      <LowerHeader />
    </section>
  );
}

export default Header;
