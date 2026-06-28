export const STATUS_OPTIONS = ["Todo", "In Progress", "Completed"];
export const PRIORITY_OPTIONS = ["Low", "Medium", "High"];

export const FILTER_STATUS_OPTIONS = ["All", ...STATUS_OPTIONS];
export const FILTER_PRIORITY_OPTIONS = ["All", ...PRIORITY_OPTIONS];

export const SORT_OPTIONS = [
  { label: "Recently Created", value: "recent" },
  { label: "Due Date", value: "dueDate" },
  { label: "Alphabetical", value: "alphabetical" }
];
