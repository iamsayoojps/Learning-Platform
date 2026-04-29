import User from "../models/userModel.js";

// Buy all cart courses
export const buyCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user.cart.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    // Add cart items to purchasedCourses
    user.cart.forEach((courseId) => {
      const alreadyBought = user.purchasedCourses.find(
        (id) => id.toString() === courseId.toString(),
      );

      if (!alreadyBought) {
        user.purchasedCourses.push(courseId);
      }
    });

    // Clear cart
    user.cart = [];

    await user.save();

    res.json({
      message: "Courses purchased successfully 🎉",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get purchased courses
export const getPurchasedCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("purchasedCourses");

    res.json(user.purchasedCourses);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// remove courses

export const removePurchasedCourse = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.purchasedCourses = user.purchasedCourses.filter(
      (courseId) => courseId.toString() !== req.params.courseId,
    );

    await user.save();

    res.json({
      message: "Course removed successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
