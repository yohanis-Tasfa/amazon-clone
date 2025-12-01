import React, { useContext, useState } from "react";
import Layout from "../../components/LayOut/Layout";
import classes from "./Payment.module.css";
import { DataContext } from "../../components/dataprovider/DataProvider";
import ProductCard from "../../components/product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/currencyformat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "../../utility/firebase";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [processing, setProcessing] = useState(false);

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
  const navigate = useNavigate();

  // card element change handler

  const handleChange = (e) => {
    console.log(e);
    e?.error?.message ? setCardError(e.error.message) : setCardError("");
  };

  // payment handler
  const handlePayement = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      // 1. create payment intent  => backend => cloud function contact to secret intent
      const response = await axiosInstance({
        method: "post",
        url: `/payments/create?total=${totalitem}`,
      });

      const clientSecret = response.data?.clientSecret;

      // 2. cleint side confirm card payment

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // 3. after confirmation order database save ,clear basket

      await setDoc(
        doc(
          collection(doc(collection(db, "users"), user.uid), "orders"),
          paymentIntent.id
        ),
        {
          basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        }
      );

      setProcessing(false);
      navigate("/orders", { state: { msg: "order success" } });
    } catch (error) {
      setProcessing(false);
    }
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
              <form onSubmit={handlePayement}>
                {/* error  */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* CardElement  */}
                <CardElement onChange={handleChange} />

                {/* price  */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px " }}>
                      Total Order | <CurrencyFormat amount={totalitem} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.spinner}>
                        <ClipLoader color="white" size={15} />
                        <p>please wait...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
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
