import Order from "../models/orderModel.js";

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("courses")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete one order
export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Clear all orders
export const clearOrders = async (req, res) => {
  try {
    await Order.deleteMany();

    res.json({ message: "All orders cleared" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Revenue
export const getRevenue = async (req, res) => {
  try {
    const orders = await Order.find();

    const totalRevenue = orders.reduce(
      (acc, order) => acc + order.totalAmount,
      0,
    );

    res.json({
      totalRevenue,
      totalOrders: orders.length,
      orders,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
