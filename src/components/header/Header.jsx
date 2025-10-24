import React from "react";

import classes from "./Header.module.css";
import amazonLogo from "../../assets/images/amazonLogo.png";
import americanLogo from "../../assets/images/americanimage.png";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";

function Header() {
  return (
    <>
      <section>
        <div className={classes.header__container}>
          {/* logo */}
          <div className={classes.logo__container}>
            <a href="">
              <img src={amazonLogo} alt="amazon logo" />
            </a>
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
            <BsSearch size={25} />
          </div>

          {/* three component */}
          <div className={classes.order__container}>
            <a href="" className={classes.language}>
              <img src={americanLogo} alt="" />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </a>

            <a href="">
              <div>
                <p>Sign In</p>
                <span>Account and Lists</span>
              </div>
            </a>
            {/* Orders  */}

            <a href="">
              <p>returns</p>
              <span> & orders</span>
            </a>
            {/* cart  */}
            <a href="" className={classes.cart}>
              <BiCart size={35} />
              <span>0</span>
            </a>
          </div>
        </div>
      </section>
      <LowerHeader />
    </>
  );
}

export default Header;
