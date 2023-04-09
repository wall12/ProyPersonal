const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


// --route:  POST /api/users/
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "Please add all fields!" });
    throw new Error("Please add all fields!");
  }

  // Checkeamos si el usuario existe
  const userRegistered = await User.findOne({ email });

  if (userRegistered) {
    res.status(400).json({ message: "This user already registered" });
    throw new Error("This user already registered");
  }

  // Password hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Crear usuario
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
    throw new Error("Invalid user data");
  }
});


// --route:  POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Checkeamos por email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Incorrect email or password!" });
    throw new Error("Incorrect email or password!");
  }
});


// --route:  GET /api/users/dashboard
const getDashboard = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Generamos Json Web Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getDashboard,
};
