import User from "../models/userModel.js";

// ➤ Add to cart
export const addToCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const existingItem = user.cart.find(
      (item) => item.course.toString() === req.body.courseId,
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cart.push({ course: req.body.courseId });
    }

    await user.save();
    res.json({ message: "Added to cart" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ➤ Remove from cart
export const removeFromCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.cart = user.cart.filter(
      (item) => item.course.toString() !== req.params.courseId,
    );

    await user.save();
    res.json({ message: "Removed from cart" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ➤ Get cart
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart.course");

    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
