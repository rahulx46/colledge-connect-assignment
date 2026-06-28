import Task from "../models/Task.js";
import AppError from "../utils/AppError.js";
import { sanitizeTaskInput, validateTaskInput } from "../utils/taskValidation.js";

export const getTasks = async (_req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json({ data: tasks });
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      throw new AppError("Task not found", 404);
    }

    res.status(200).json({ data: task });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { errors, isValid } = validateTaskInput(req.body);

    if (!isValid) {
      throw new AppError("Task validation failed", 400, errors);
    }

    const task = await Task.create(sanitizeTaskInput(req.body));
    res.status(201).json({ data: task });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { errors, isValid } = validateTaskInput(req.body);

    if (!isValid) {
      throw new AppError("Task validation failed", 400, errors);
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      sanitizeTaskInput(req.body),
      {
        new: true,
        runValidators: true
      }
    );

    if (!task) {
      throw new AppError("Task not found", 404);
    }

    res.status(200).json({ data: task });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      throw new AppError("Task not found", 404);
    }

    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    next(error);
  }
};
