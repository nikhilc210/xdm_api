const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

exports.verifyAdminToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ status: "error", message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);

    if (!admin || admin.currentToken !== token) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid or expired session" });
    }

    req.admin = admin;
    next();
  } catch (err) {
    res
      .status(401)
      .json({ status: "error", message: "Unauthorized: " + err.message });
  }
};
