import {
  FILTER_PRIORITY_OPTIONS,
  FILTER_STATUS_OPTIONS,
  SORT_OPTIONS
} from "../utils/options.js";

const SelectField = ({ label, name, onChange, options, value }) => (
  <label className="space-y-2">
    <span className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
      {label}
    </span>
    <select
      className="field h-10"
      name={name}
      value={value}
      onChange={(event) => onChange(name, event.target.value)}
    >
      {options.map((option) => {
        const item = typeof option === "string" ? { label: option, value: option } : option;
        return (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        );
      })}
    </select>
  </label>
);

const Sidebar = ({
  counts,
  filters,
  isOpen,
  onChange,
  onClear,
  onClose,
  totalTasks
}) => {
  const content = (
    <aside className="h-full w-full border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 md:w-64 md:border-r">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 md:hidden dark:border-slate-800">
        <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">Filters</p>
        <button
          className="icon-button"
          type="button"
          onClick={onClose}
          aria-label="Close filters"
        >
          x
        </button>
      </div>

      <div className="space-y-6 p-4">
        <section className="space-y-3">
          <div>
            <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">
              Task overview
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {totalTasks} {totalTasks === 1 ? "task" : "tasks"} in your workspace
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 md:grid-cols-1">
            {Object.entries(counts).map(([status, count]) => (
              <div
                className="rounded-md border border-slate-200 px-3 py-2 dark:border-slate-800"
                key={status}
              >
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">{status}</p>
                <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">
                  {count}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <SelectField
            label="Status"
            name="status"
            options={FILTER_STATUS_OPTIONS}
            value={filters.status}
            onChange={onChange}
          />
          <SelectField
            label="Priority"
            name="priority"
            options={FILTER_PRIORITY_OPTIONS}
            value={filters.priority}
            onChange={onChange}
          />
          <SelectField
            label="Sort"
            name="sort"
            options={SORT_OPTIONS}
            value={filters.sort}
            onChange={onChange}
          />
        </section>

        <button className="secondary-button w-full" type="button" onClick={onClear}>
          Clear filters
        </button>
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden md:block">{content}</div>
      {isOpen ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            className="absolute inset-0 bg-slate-950/40"
            type="button"
            onClick={onClose}
            aria-label="Close filters"
          />
          <div className="relative h-full max-w-sm shadow-soft">{content}</div>
        </div>
      ) : null}
    </>
  );
};

export default Sidebar;
