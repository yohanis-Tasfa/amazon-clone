import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Signup from "./pages/auth/Signup";
import Payment from "./pages/payment/Payment";
import Order from "./pages/orders/Order";
import Cart from "./pages/cart/Cart";

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Signup />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
