import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";

export const adminProtect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.admin = await Admin.findById(decoded.id).select("-password");

      return next();
    } catch (error) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }
  }

  return res.status(401).json({
    message: "No token",
  });
};
