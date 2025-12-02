import React, { useContext, useState } from "react";
import Layout from "../../components/LayOut/Layout";
import classes from "./Payment.module.css";
import { DataContext } from "../../components/dataprovider/DataProvider";
import ProductCard from "../../components/product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/currencyformat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../utility/firebase";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [processing, setProcessing] = useState(false);
  const [cardError, setCardError] = useState("");

  const [{ user, basket }, dispatch] = useContext(DataContext);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const totalItems = basket?.reduce((sum, item) => sum + item.amount, 0);
  const totalPrice = basket?.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );

  // Card element change handler
  const handleChange = (e) => {
    setCardError(e.error ? e.error.message : "");
  };

  // Payment handler
  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    try {
      setProcessing(true);

      // 1. Request payment intent from backend
      const response = await axiosInstance.post(
        `/payments/create?total=${Math.round(totalPrice * 100)}`
      );
      const clientSecret = response.data.clientSecret;

      // 2. Confirm card payment
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        setCardError(error.message);
        setProcessing(false);
        return;
      }

      // 3. Save order to Firestore
      const orderRef = doc(db, "users", user.uid, "orders", paymentIntent.id);
      await setDoc(orderRef, {
        basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      // 4. Empty basket
      dispatch({ type: "EMPTY_BASKET" });

      // 5. Redirect
      setProcessing(false);
      navigate("/orders", { state: { msg: "Order successful" } });
    } catch (err) {
      console.error("Payment error:", err);
      setProcessing(false);
      setCardError("Payment failed. Please try again.");
    }
  };

  return (
    <Layout>
      {/* Header */}
      <div className={classes.Payment_header}>
        Checkout ({totalItems}) items
      </div>

      <section className={classes.Payment_section}>
        {/* Delivery Address */}
        <div className={classes.Payment_address}>
          <h3>Delivery Address</h3>
          <div className={classes.payment_card_container}>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Ethiopia</div>
          </div>
        </div>

        <hr />

        {/* Review Items */}
        <div className={classes.Payment_address}>
          <h3>Review items and delivery</h3>
          <div>
            {basket.map((item) => (
              <ProductCard
                product={item}
                flex={true}
                key={item.title + item.id}
              />
            ))}
          </div>
        </div>

        <hr />

        {/* Payment Section */}
        <div className={classes.Payment_address}>
          <h3>Payment Method</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {/* Stripe errors */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}

                {/* Card Element */}
                <CardElement onChange={handleChange} />

                {/* Price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      Total Order | <CurrencyFormat amount={totalPrice} />
                    </span>
                  </div>

                  <button type="submit" disabled={processing}>
                    {processing ? (
                      <div className={classes.spinner}>
                        <ClipLoader size={15} />
                        <p>Please wait...</p>
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
