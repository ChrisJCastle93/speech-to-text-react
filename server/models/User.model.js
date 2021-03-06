const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
    },
    password: String,
    role: {
      type: String,
      enum: ["ADMIN", "CUSTOMER"],
      default: "ADMIN" // <-- Change to CUSTOMER after we finished developing.
    },
    orders: Array
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
