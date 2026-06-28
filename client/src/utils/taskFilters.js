export const getVisibleTasks = (tasks, filters) => {
  const query = filters.search.trim().toLowerCase();

  return [...tasks]
    .filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(query);
      const matchesStatus = filters.status === "All" || task.status === filters.status;
      const matchesPriority =
        filters.priority === "All" || task.priority === filters.priority;

      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      if (filters.sort === "dueDate") {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }

      if (filters.sort === "alphabetical") {
        return a.title.localeCompare(b.title);
      }

      return new Date(b.createdAt) - new Date(a.createdAt);
    });
};
