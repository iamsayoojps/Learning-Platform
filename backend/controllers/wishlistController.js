import User from "../models/userModel.js";

// ➤ Add to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.wishlist.includes(req.body.courseId)) {
      return res.status(400).json({ message: "Already in wishlist" });
    }

    user.wishlist.push(req.body.courseId);
    await user.save();

    res.json({ message: "Added to wishlist" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ➤ Remove
export const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== req.params.courseId,
    );

    await user.save();

    res.json({ message: "Removed from wishlist" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ➤ Get wishlist
export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("wishlist");

    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
