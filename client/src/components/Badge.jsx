const priorityStyles = {
  Low: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-900",
  Medium:
    "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:ring-amber-900",
  High: "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:ring-rose-900"
};

const statusStyles = {
  Todo: "bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-800",
  "In Progress":
    "bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:ring-blue-900",
  Completed:
    "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-900"
};

const Badge = ({ children, type = "status" }) => {
  const styles = type === "priority" ? priorityStyles : statusStyles;

  return (
    <span
      className={`inline-flex h-6 items-center rounded px-2 text-xs font-medium ring-1 ring-inset ${
        styles[children] || styles.Todo
      }`}
    >
      {children}
    </span>
  );
};

export default Badge;
