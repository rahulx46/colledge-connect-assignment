import { useTheme } from "../context/ThemeContext.jsx";

const Navbar = ({ onNewTask, onOpenFilters, search, setSearch }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          className="inline-flex h-9 items-center justify-center rounded-md border border-slate-200 px-3 text-xs font-medium text-slate-600 transition hover:bg-slate-50 md:hidden dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
          type="button"
          onClick={onOpenFilters}
          aria-label="Open filters"
        >
          Menu
        </button>

        <div className="flex min-w-0 items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-md bg-accent-600 text-sm font-semibold text-white">
            T
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-950 dark:text-slate-50">
              Task Tracker
            </p>
            <p className="hidden text-xs text-slate-500 sm:block dark:text-slate-400">
              Focused work, neatly tracked
            </p>
          </div>
        </div>

        <div className="ml-auto flex flex-1 items-center justify-end gap-2">
          <label className="relative hidden w-full max-w-md sm:block">
            <span className="sr-only">Search tasks</span>
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
              /
            </span>
            <input
              className="h-10 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-slate-800"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by title"
              type="search"
            />
          </label>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-xs font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? "D" : "L"}
          </button>

          <button className="primary-button h-10" type="button" onClick={onNewTask}>
            New Task
          </button>
        </div>
      </div>
      <div className="border-t border-slate-100 px-4 py-3 sm:hidden dark:border-slate-900">
        <label className="relative block">
          <span className="sr-only">Search tasks</span>
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
            /
          </span>
          <input
            className="h-10 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-slate-800"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title"
            type="search"
          />
        </label>
      </div>
    </header>
  );
};

export default Navbar;
