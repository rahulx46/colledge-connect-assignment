const SkeletonList = () => (
  <div className="space-y-3">
    {Array.from({ length: 4 }).map((_, index) => (
      <div
        className="animate-pulse rounded-md border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950"
        key={index}
      >
        <div className="h-4 w-2/5 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="mt-3 h-3 w-4/5 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="mt-2 h-3 w-3/5 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="mt-4 flex gap-2">
          <div className="h-6 w-20 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-6 w-20 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-6 w-28 rounded bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    ))}
  </div>
);

export default SkeletonList;
