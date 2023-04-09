const asyncHandler = require("express-async-handler");


const Tarea = require("../models/tareaModel");
const User = require("../models/userModel");


// --route:  GET /api/tareas
const getTareas = asyncHandler(async (req, res) => {
  const tareas = await Tarea.find({ user: req.user.id });

  res.status(200).json(tareas);
});


// --route:  SET /api/tareas
const setTarea = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add some words");
  }

  const tarea = await Tarea.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(tarea);
});


// --route:  DELETE /api/tareas/:id
const deleteTarea = asyncHandler(async (req, res) => {
  const tarea = await Tarea.findById(req.params.id);

  if (!tarea) {
    res.status(400);
    throw new Error("Tarea not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found !");
  }

  if (tarea.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await tarea.remove();

  res.status(200).json({ id: req.params.id });
});


// --route:  PUT /api/tareas/:id
const updateTarea = asyncHandler(async (req, res) => {
  const tarea = await Tarea.findById(req.params.id);

  if (!tarea) {
    res.status(400);
    throw new Error("Tarea not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found !");
  }

  if (tarea.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updateTarea = await Tarea.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updateTarea);
});

module.exports = {
  getTareas,
  setTarea,
  deleteTarea,
  updateTarea,
};
