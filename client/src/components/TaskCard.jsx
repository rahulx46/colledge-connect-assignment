import Badge from "./Badge.jsx";
import { formatDate, isOverdue } from "../utils/date.js";

const TaskCard = ({ onDelete, onEdit, task }) => {
  const overdue = isOverdue(task);

  return (
    <article
      className={`rounded-md border bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-soft dark:bg-slate-950 dark:hover:border-slate-700 ${
        overdue
          ? "border-rose-200 dark:border-rose-900"
          : "border-slate-200 dark:border-slate-800"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <h2 className="break-words text-base font-semibold text-slate-950 dark:text-slate-50">
            {task.title}
          </h2>
          <p className="line-clamp-2 break-words text-sm leading-6 text-slate-600 dark:text-slate-300">
            {task.description || "No description provided."}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button className="icon-button" type="button" onClick={() => onEdit(task)}>
            Edit
          </button>
          <button
            className="danger-icon-button"
            type="button"
            onClick={() => onDelete(task)}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Badge>{task.status}</Badge>
        <Badge type="priority">{task.priority}</Badge>
        <span
          className={`inline-flex h-6 items-center rounded px-2 text-xs font-medium ring-1 ring-inset ${
            overdue
              ? "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:ring-rose-900"
              : "bg-slate-50 text-slate-600 ring-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-800"
          }`}
        >
          {overdue ? "Overdue: " : "Due: "}
          {formatDate(task.dueDate)}
        </span>
      </div>
    </article>
  );
};

export default TaskCard;
