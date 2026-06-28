import { useMemo, useState } from "react";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import EmptyState from "../components/EmptyState.jsx";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import SkeletonList from "../components/SkeletonList.jsx";
import Spinner from "../components/Spinner.jsx";
import TaskCard from "../components/TaskCard.jsx";
import TaskFormModal from "../components/TaskFormModal.jsx";
import useTasks from "../hooks/useTasks.js";
import { STATUS_OPTIONS } from "../utils/options.js";
import { getVisibleTasks } from "../utils/taskFilters.js";

const defaultFilters = {
  search: "",
  status: "All",
  priority: "All",
  sort: "recent"
};

const TasksPage = () => {
  const { addTask, editTask, isLoading, isSaving, removeTask, tasks } = useTasks();
  const [filters, setFilters] = useState(defaultFilters);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const visibleTasks = useMemo(() => getVisibleTasks(tasks, filters), [filters, tasks]);

  const counts = useMemo(
    () =>
      STATUS_OPTIONS.reduce((result, status) => {
        result[status] = tasks.filter((task) => task.status === status).length;
        return result;
      }, {}),
    [tasks]
  );

  const hasFilters =
    filters.search ||
    filters.status !== defaultFilters.status ||
    filters.priority !== defaultFilters.priority;

  const updateFilter = (name, value) => {
    setFilters((current) => ({ ...current, [name]: value }));
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const closeFormModal = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleSaveTask = async (payload) => {
    if (editingTask) {
      await editTask(editingTask._id, payload);
      return;
    }

    await addTask(payload);
  };

  const confirmDelete = async () => {
    if (!taskToDelete) return;

    await removeTask(taskToDelete._id);
    setTaskToDelete(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar
        onNewTask={openCreateModal}
        onOpenFilters={() => setIsSidebarOpen(true)}
        search={filters.search}
        setSearch={(search) => updateFilter("search", search)}
      />

      <div className="mx-auto flex max-w-7xl">
        <Sidebar
          counts={counts}
          filters={filters}
          isOpen={isSidebarOpen}
          onChange={updateFilter}
          onClear={clearFilters}
          onClose={() => setIsSidebarOpen(false)}
          totalTasks={tasks.length}
        />

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold tracking-normal text-slate-950 dark:text-slate-50">
                Tasks
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {isLoading
                  ? "Loading your task list"
                  : `${visibleTasks.length} of ${tasks.length} shown`}
              </p>
            </div>
            <div className="hidden md:block">
              {isLoading ? <Spinner label="Syncing" /> : null}
            </div>
          </div>

          {isLoading ? (
            <SkeletonList />
          ) : visibleTasks.length ? (
            <div className="space-y-3">
              {visibleTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  onDelete={setTaskToDelete}
                  onEdit={openEditModal}
                  task={task}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              hasFilters={Boolean(hasFilters)}
              onCreate={openCreateModal}
              onReset={clearFilters}
            />
          )}
        </main>
      </div>

      <TaskFormModal
        initialTask={editingTask}
        isOpen={isFormOpen}
        isSaving={isSaving}
        onClose={closeFormModal}
        onSubmit={handleSaveTask}
      />

      <ConfirmDialog
        isOpen={Boolean(taskToDelete)}
        onCancel={() => setTaskToDelete(null)}
        onConfirm={confirmDelete}
        task={taskToDelete}
      />
    </div>
  );
};

export default TasksPage;
