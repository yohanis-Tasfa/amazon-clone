// functions/index.js  ← FINAL VERSION THAT NEVER CRASHES
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const stripe = require("stripe")(
  process.env.STRIPE_KEY || process.env.STRIPE_SECRET_KEY || "sk_test_123" // fallback
);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// ROOT
app.get("/", (req, res) => {
  res.json({ message: "API Running!", project: "clone-72e28" });
});

// PAYMENT ENDPOINT — ULTRA SAFE
app.post("/payments/create", async (req, res) => {
  try {
    const total = parseInt(req.query.total || "0", 10);

    if (total <= 0) {
      return res.status(400).json({ error: "Invalid total" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    console.log("SUCCESS:", paymentIntent.id);
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("FATAL ERROR:", error);
    res.status(500).json({ error: "Payment failed", details: error.message });
  }
});

exports.api = functions.https.onRequest(app);