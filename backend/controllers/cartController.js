import User from "../models/userModel.js";

// Add to cart
export const addToCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const existingItem = user.cart.find(
      (item) => item.toString() === req.body.courseId,
    );

    if (existingItem) {
      return res.status(400).json({
        message: "Course already in cart ⚠️",
      });
    }

    user.cart.push(req.body.courseId);

    await user.save();

    res.json({
      message: "Course added to cart 🛒",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove cart item
export const removeFromCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.cart = user.cart.filter((id) => id.toString() !== req.params.courseId);

    await user.save();

    res.json({
      message: "Course removed from cart ❌",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get cart
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart");

    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
