import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    username: String,
    email: String,

    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],

    totalAmount: Number,
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
