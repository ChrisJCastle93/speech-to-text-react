const router = require("express").Router();
const User = require('../models/User.model');
const Order = require('../models/Order.model');

router.post("/new", async (req, res) => {

  console.log(req.body.cartData)
  console.log(req.body.userId)
  
  const orderDetails = {
    products: req.body.cartData
  }
  
  try {
    console.log('trying order')
    const createdOrder = await Order.create(orderDetails);
  
    const foundUser = await User.findByIdAndUpdate(req.body.userId, { $push: { "orders": createdOrder._id }}, {new: true})
    console.log(`ORDER CREATED: ${createdOrder} AND MATCHED TO USER: ${foundUser}`)
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
