const Admin = require("../../models/Admin");
const { generateToken } = require("../../utils");

// Login admin
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin || admin.deleted) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid credentials" });
    }

    if (admin.status !== "Active") {
      return res.status(403).json({
        status: "error",
        message:
          "Your administrator account is suspended. Please contact the system administrator or support team for help",
      });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid credentials" });
    }

    // Invalidate old token by replacing it
    const token = generateToken(admin._id);
    admin.currentToken = token;
    await admin.save();

    res.status(200).json({
      status: "success",
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
        name: admin.fullName,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
