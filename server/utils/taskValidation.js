import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../models/Task.js";

const TITLE_MAX_LENGTH = 80;
const DESCRIPTION_MAX_LENGTH = 500;

const isValidDate = (value) => {
  if (!value) return false;
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
};

export const validateTaskInput = (payload) => {
  const errors = {};
  const title = String(payload.title ?? "").trim();
  const description = String(payload.description ?? "");

  if (!title) {
    errors.title = "Title is required";
  } else if (title.length > TITLE_MAX_LENGTH) {
    errors.title = `Title cannot exceed ${TITLE_MAX_LENGTH} characters`;
  }

  if (description.length > DESCRIPTION_MAX_LENGTH) {
    errors.description = `Description cannot exceed ${DESCRIPTION_MAX_LENGTH} characters`;
  }

  if (!STATUS_OPTIONS.includes(payload.status)) {
    errors.status = "Choose a valid status";
  }

  if (!PRIORITY_OPTIONS.includes(payload.priority)) {
    errors.priority = "Choose a valid priority";
  }

  if (!isValidDate(payload.dueDate)) {
    errors.dueDate = "Enter a valid due date";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

export const sanitizeTaskInput = (payload) => ({
  title: String(payload.title ?? "").trim(),
  description: String(payload.description ?? "").trim(),
  status: payload.status,
  priority: payload.priority,
  dueDate: payload.dueDate
});
