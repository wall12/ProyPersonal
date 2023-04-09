const express = require("express");
const router = express.Router();
const {
  getTareas,
  setTarea,
  deleteTarea,
  updateTarea,
} = require("../controllers/tareasController");
const { protect } = require("../middlewares/authMiddleware");

router.route("/").get(protect, getTareas).post(protect, setTarea);
router.route("/:id").put(protect, updateTarea).delete(protect, deleteTarea);

module.exports = router;
