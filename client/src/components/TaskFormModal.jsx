import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "./Modal.jsx";
import { getFieldErrors } from "../utils/errors.js";
import { toInputDate } from "../utils/date.js";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../utils/options.js";

const DESCRIPTION_LIMIT = 500;
const TITLE_LIMIT = 80;

const defaultValues = {
  title: "",
  description: "",
  status: "Todo",
  priority: "Medium",
  dueDate: ""
};

const ErrorMessage = ({ children }) =>
  children ? <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">{children}</p> : null;

const TaskFormModal = ({ initialTask, isOpen, isSaving, onClose, onSubmit }) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setError,
    setFocus,
    watch
  } = useForm({ defaultValues });

  const description = watch("description") || "";
  const isEditing = Boolean(initialTask);

  useEffect(() => {
    if (!isOpen) return;

    reset(
      initialTask
        ? {
            title: initialTask.title,
            description: initialTask.description || "",
            status: initialTask.status,
            priority: initialTask.priority,
            dueDate: toInputDate(initialTask.dueDate)
          }
        : defaultValues
    );

    window.requestAnimationFrame(() => setFocus("title"));
  }, [initialTask, isOpen, reset, setFocus]);

  const submitHandler = async (values) => {
    try {
      await onSubmit(values);
      onClose();
    } catch (error) {
      const fieldErrors = getFieldErrors(error);
      Object.entries(fieldErrors).forEach(([field, message]) => {
        setError(field, { message });
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={isSaving ? () => {} : onClose}
      title={isEditing ? "Edit task" : "New task"}
    >
      <form className="space-y-4 p-5" onSubmit={handleSubmit(submitHandler)}>
        <label className="block">
          <span className="label">Title</span>
          <input
            className="field mt-2"
            id="task-title"
            maxLength={TITLE_LIMIT}
            type="text"
            {...register("title", {
              required: "Title is required",
              maxLength: {
                value: TITLE_LIMIT,
                message: `Title cannot exceed ${TITLE_LIMIT} characters`
              }
            })}
          />
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
        </label>

        <label className="block">
          <span className="label">Description</span>
          <textarea
            className="field mt-2 min-h-28 resize-y"
            id="task-description"
            maxLength={DESCRIPTION_LIMIT}
            rows={4}
            {...register("description", {
              maxLength: {
                value: DESCRIPTION_LIMIT,
                message: `Description cannot exceed ${DESCRIPTION_LIMIT} characters`
              }
            })}
          />
          <div className="mt-1 flex items-center justify-between gap-3">
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
            <span className="ml-auto text-xs text-slate-500 dark:text-slate-400">
              {description.length}/{DESCRIPTION_LIMIT}
            </span>
          </div>
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="label">Status</span>
            <select
              className="field mt-2"
              id="task-status"
              {...register("status", { required: true })}
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <ErrorMessage>{errors.status?.message}</ErrorMessage>
          </label>

          <label className="block">
            <span className="label">Priority</span>
            <select
              className="field mt-2"
              id="task-priority"
              {...register("priority", { required: true })}
            >
              {PRIORITY_OPTIONS.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
            <ErrorMessage>{errors.priority?.message}</ErrorMessage>
          </label>
        </div>

        <label className="block">
          <span className="label">Due date</span>
          <input
            className="field mt-2"
            id="task-due-date"
            type="date"
            {...register("dueDate", {
              required: "Due date is required",
              validate: (value) =>
                Number.isNaN(new Date(value).getTime()) ? "Enter a valid due date" : true
            })}
          />
          <ErrorMessage>{errors.dueDate?.message}</ErrorMessage>
        </label>

        <div className="flex justify-end gap-2 pt-2">
          <button
            className="secondary-button"
            type="button"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </button>
          <button className="primary-button min-w-28" type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : isEditing ? "Save task" : "Create task"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskFormModal;
