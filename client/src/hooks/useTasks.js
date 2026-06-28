import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as taskService from "../services/taskService.js";
import { getApiErrorMessage } from "../utils/errors.js";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const loadTasks = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await taskService.fetchTasks();
      setTasks(data);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to load tasks"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const addTask = async (payload) => {
    setIsSaving(true);

    try {
      const task = await taskService.createTask(payload);
      setTasks((current) => [task, ...current]);
      toast.success("Task created");
      return task;
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to create task"));
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const editTask = async (taskId, payload) => {
    setIsSaving(true);

    try {
      const task = await taskService.updateTask(taskId, payload);
      setTasks((current) => current.map((item) => (item._id === task._id ? task : item)));
      toast.success("Task updated");
      return task;
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to update task"));
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const removeTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks((current) => current.filter((task) => task._id !== taskId));
      toast.success("Task deleted");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to delete task"));
      throw error;
    }
  };

  return {
    addTask,
    editTask,
    isLoading,
    isSaving,
    loadTasks,
    removeTask,
    tasks
  };
};

export default useTasks;
