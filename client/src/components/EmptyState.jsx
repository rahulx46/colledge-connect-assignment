const EmptyState = ({ hasFilters, onCreate, onReset }) => (
  <div className="grid min-h-80 place-items-center rounded-md border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-950">
    <div className="max-w-sm space-y-4">
      <div
        className="mx-auto grid h-12 w-12 place-items-center rounded-md border border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
        aria-hidden="true"
      >
        T
      </div>
      <div>
        <h2 className="text-base font-semibold text-slate-950 dark:text-slate-50">
          {hasFilters ? "No matching tasks" : "No tasks yet"}
        </h2>
        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
          {hasFilters
            ? "Adjust the search or filters to bring tasks back into view."
            : "Create the first task and keep the list moving."}
        </p>
      </div>
      <div className="flex justify-center gap-2">
        {hasFilters ? (
          <button className="secondary-button" type="button" onClick={onReset}>
            Reset view
          </button>
        ) : null}
        <button className="primary-button" type="button" onClick={onCreate}>
          New Task
        </button>
      </div>
    </div>
  </div>
);

export default EmptyState;
