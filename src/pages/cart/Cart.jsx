import React, { useContext } from "react";
import Layout from "../../components/LayOut/Layout";
import { DataContext } from "../../components/dataprovider/DataProvider";
import ProductCard from "../../components/product/ProductCard";
import CurrencyFormat from "../../components/currencyformat/CurrencyFormat";
import { Link } from "react-router-dom";
import Classes from "./cart.module.css";
import { type } from "../../utility/action.type";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

function Cart() {
  const [{ basket }, dispatch] = useContext(DataContext);
  const total = basket?.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const increment = (item) => {
    dispatch({
      type: type.ADD_TO_BASKET,
      item,
    });
  };

  const decrement = (id) => {
    dispatch({
      type: type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <Layout>
      <section className={Classes.container}>
        <div className={Classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your shoping basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>oopps ! no item in your cart</p>
          ) : (
            basket?.map((item, i) => {
              return (
                <section key={i} className={Classes.cart_product}>
                  <ProductCard
                    key={i}
                    product={item}
                    renderDesc={true}
                    renderAdd={false}
                    flex={true}
                  />

                  <div className={Classes.btn_container}>
                    <button
                      className={Classes.btn}
                      onClick={() => increment(item)}
                    >
                      <IoIosArrowUp size={20} />
                    </button>
                    <span>{item.amount}</span>
                    <button
                      className={Classes.btn}
                      onClick={() => decrement(item.id)}
                    >
                      <IoIosArrowDown size={20} />
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={Classes.subtotal}>
            <div>
              <p>
                Subtotal (
                {basket?.reduce((total, item) => total + item.amount, 0)} items)
              </p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payment">Continue to checkout</Link>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Cart;
