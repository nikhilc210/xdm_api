const Admin = require("../../models/Admin");
const bcrypt = require("bcryptjs");

// CREATE administrator
exports.createAdmin = async (req, res) => {
  const { fullName, email, password, location, role } = req.body;

  try {
    // Check if email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ status: "error", message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    let code = "AD" + Math.floor(10000 + Math.random() * 90000);
    const newAdmin = new Admin({
      code,
      fullName,
      email,
      password: hashedPassword,
      location,
      role,
    });

    const savedAdmin = await newAdmin.save();
    res.status(201).json({ status: "success", message: savedAdmin });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// UPDATE administrator
exports.updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { fullName, email, password, location, role, status } = req.body;

  try {
    const admin = await Admin.findById(id);
    if (!admin) {
      return res
        .status(404)
        .json({ status: "error", message: "Admin not found" });
    }

    // Update fields if provided
    if (fullName) admin.fullName = fullName;
    if (email) admin.email = email;
    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      admin.password = hashedPassword;
    }
    if (location) admin.location = location;
    if (role) admin.role = role;
    if (status) admin.status = status;

    const updatedAdmin = await admin.save();
    res.status(200).json({ status: "success", message: updatedAdmin });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// GET adminstrator
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json({ status: "success", admins });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAdminDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const admins = await Admin.find({ _id: id });
    res.status(200).json({ status: "success", admins });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
