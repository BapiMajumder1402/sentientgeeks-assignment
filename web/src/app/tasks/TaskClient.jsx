'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTasks, createTask, updateTask, deleteTask, toggleTaskComplete } from '@/services/taskService';
import toast from 'react-hot-toast';
import useDebounce from '@/hooks/useDebounce';
import TaskForm from './TaskForm';
import TaskControls from './TaskControls';
import TaskList from './TaskList';
import EditTaskModal from './EditTaskModal';

const TASK_QUERY_KEY = 'tasks';

export default function TaskClient({ initialData }) {
  const queryClient = useQueryClient();

  const [task, setTask] = useState('');
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  const debouncedSearch = useDebounce(search, 500);

  const queryOptions = { page, search: debouncedSearch, limit, sortBy, sortOrder };
  const queryKey = [TASK_QUERY_KEY, queryOptions];

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => fetchTasks(queryOptions),
    initialData,
    keepPreviousData: true,
  });

  const invalidateTasks = () => {
    queryClient.invalidateQueries({
      predicate: query => query.queryKey[0] === TASK_QUERY_KEY,
    });
  };

  const taskMutation = useMutation({
    mutationFn: ({ title, editId }) =>
      editId ? updateTask(editId, title) : createTask(title),
    onSuccess: () => {
      invalidateTasks();
      toast.success(editId ? 'Task updated' : 'Task added');
      setTask('');
      setEditId(null);
    },
    onError: () => toast.error('Something went wrong'),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      invalidateTasks();
      toast.success('Task deleted');
    },
    onError: () => toast.error('Failed to delete task'),
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, completed }) => toggleTaskComplete(id, completed),
    onSuccess: () => {
      invalidateTasks();
      toast.success('Task status updated');
    },
    onError: () => toast.error('Failed to update task'),
  });

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 md:p-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Todo List</h2>

      <TaskForm
        task={task}
        setTask={setTask}
        editId={editId}
        onSubmit={(title) => taskMutation.mutate({ title, editId })}
      />

      <TaskControls
        search={search}
        setSearch={setSearch}
        limit={limit}
        setLimit={setLimit}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <TaskList
        data={data}
        page={page}
        setPage={setPage}
        isLoading={isLoading}
        setTask={setTask}
        setEditId={setEditId}
        onDelete={deleteMutation.mutate}
        onToggle={(task) =>
          toggleMutation.mutate({ id: task._id, completed: !task.completed })
        }
      />

      <EditTaskModal
        editId={editId}
        taskTitle={task}
        onClose={() => {
          setEditId(null);
          setTask('');
        }}
        onUpdate={(newTitle) =>
          taskMutation.mutate({ title: newTitle, editId })
        }
      />
    </div>
  );
}
