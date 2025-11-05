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

function Header() {
  const [{ basket }, dispatch] = useContext(DataContext);
  // console.log(basket);

  return (
    <section className={classes.fixed_header}>
      <section>
        <div className={classes.header__container}>
          {/* logo */}
          <div className={classes.logo__container}>
            <Link to="/">
              <img src={amazonLogo} alt="amazon logo" />
            </Link>
            {/* delivery */}
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
          {/* search */}
          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" name="" id="" placeholder="search product" />
            <BsSearch size={42} />
          </div>

          {/* three component */}
          <div className={classes.order__container}>
            <a href="" className={classes.language}>
              <img src={americanLogo} alt="" />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </a>

            <Link to=" ">
              <div>
                <p>Sign In</p>
                <span>Account and Lists</span>
              </div>
            </Link>
            {/* Orders  */}

            <Link to="/orders">
              <p>returns</p>
              <span> & orders</span>
            </Link>
            {/* cart  */}
            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span>{basket.length}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
}

export default Header;
