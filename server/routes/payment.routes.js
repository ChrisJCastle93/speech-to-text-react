const router = require("express").Router();
require('dotenv/config')
const stripe = require("stripe")(process.env.STRIPE_SECRET)

router.post("/create-checkout-session", async (req, res) => {

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "EUR",
          product_data: {
            name: "Test Product",
          },
          unit_amount: req.body.cartTotal * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.DOMAIN}/checkout?success=true`,
    cancel_url: `${process.env.DOMAIN}/checkout?canceled=true`,
  });

  res.json({"url":session.url});
});

module.exports = router;
