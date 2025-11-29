import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Auth from "./pages/auth/Auth";
import Payment from "./pages/payment/Payment";
import Order from "./pages/orders/Order";
import Cart from "./pages/cart/Cart";
import Result from "./pages/result/Result";
import ProductDetail from "./pages/productDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51SYSaGKEkr13WB8ikXoeUuXEcUvJw9srayFPAuIJov2basivlXCuc7Buxkc2kNfq1R3t5HAIbjcgE7g9vyBeiM0c00UnHzGmqO"
);

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payment"
          element={
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          }
        />
        <Route path="/orders" element={<Order />} />
        <Route path="/category/:categoryName" element={<Result />} />
        <Route path="/product/:productid" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
