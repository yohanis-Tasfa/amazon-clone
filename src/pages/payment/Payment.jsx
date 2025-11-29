import React, { useContext, useState } from "react";
import Layout from "../../components/LayOut/Layout";
import classes from "./Payment.module.css";
import { DataContext } from "../../components/dataprovider/DataProvider";
import ProductCard from "../../components/product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/currencyformat/CurrencyFormat";

function Payment() {
  const [{ user, basket }] = useContext(DataContext);
  const total = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const totalitem = basket?.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    console.log(e);
    e?.error?.message ? setCardError(e.error.message) : setCardError("");
  };
  return (
    <Layout>
      {/* header  */}
      <div className={classes.Payment_header}>Cheakout ({total}) items</div>

      {/* payment method  */}
      <section className={classes.Payment_section}>
        {/* address  */}
        <div className={classes.Payment_address}>
          <h3>Delivery Address</h3>
          <div className={classes.payment_card_container}>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>ETHIOPIA</div>
          </div>
        </div>
        <hr />

        {/* product item  */}
        <div className={classes.Payment_address}>
          <h3>Review items and delivery</h3>
          <div>
            {basket.map((item) => (
              <ProductCard product={item} flex={true} key={item.title} />
            ))}
          </div>
        </div>

        <hr />

        {/* card from */}
        <div className={classes.Payment_address}>
          <h3>Payment Method</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form action="">
                {/* error  */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* CardElement  */}
                <CardElement onChange={handleChange} />

                {/* price  */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      Total Order | <CurrencyFormat amount={totalitem} />
                    </span>
                  </div>
                  <button>
                    <span>Buy Now</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
