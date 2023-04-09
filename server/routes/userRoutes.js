const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getDashboard,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/dashboard", protect, getDashboard);

module.exports = router;
