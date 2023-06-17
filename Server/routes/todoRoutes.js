const express = require("express");
const asyncHandler = require("express-async-handler");
const Todo = require("../models/Todo");

const todoRoutes = express.Router();

// All
todoRoutes.get(
  "/",
  asyncHandler(async (req, res) => {
    const todo = await Todo.find({});
    res.json(todo);
  })
);

// Single
todoRoutes.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404);
      throw new Error("Todo Not Found");
    }
  })
);

todoRoutes.post(
  "/post",
  asyncHandler(async (req, res) => {
    const todo = req.body;
    try {
      const createdTodo = await Todo.create(todo);
      res.status(201).json(createdTodo);
    } catch (error) {
      res.status(500).json({ error: "Todo creation failed" });
    }
  })
);

todoRoutes.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (todo) {
      res.json({ message: "Todo deleted successfully" });
    } else {
      res.status(404);
      throw new Error("Todo Not Found");
    }
  })
);

module.exports = todoRoutes;
