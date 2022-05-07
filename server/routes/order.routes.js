const router = require("express").Router();
const User = require('../models/User.model');
const Order = require('../models/Order.model');

router.post("/new", async (req, res) => {
  
  const orderDetails = {
    products: req.body
  }
  
  try {
    console.log('trying order')
    const createdOrder = await Order.create(orderDetails);
  
    // const foundUser = await User.findByIdAndUpdate('USER DETAILS GO HERE', { $push: { "orders": orderDetails.id }}, {new: true})
    // console.log(`ORDER CREATED: ${createdOrder} AND MATCHED TO USER: ${foundUser}`)
    res.json(createdOrder)
    
  } catch (err) {
    console.log(err)
  }
  
});

router.post("/:id/paid", async (req, res) => {
  const orderId = req.params.id;
  Order.findByIdAndUpdate(orderId, { paid: true }, { new: true });
});

module.exports = router;
