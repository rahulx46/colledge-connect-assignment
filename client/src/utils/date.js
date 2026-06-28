export const toInputDate = (value) => {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
};

export const formatDate = (value) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));

export const isOverdue = (task) => {
  if (!task?.dueDate || task.status === "Completed") return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(task.dueDate);
  dueDate.setHours(0, 0, 0, 0);

  return dueDate < today;
};
