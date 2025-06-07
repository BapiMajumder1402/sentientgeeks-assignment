'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
} from '@/services/taskService';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import useDebounce from '@/hooks/useDebounce';

export default function TaskClient({ initialData }) {
    const router = useRouter();
    const queryClient = useQueryClient();

    const [task, setTask] = useState('');
    const [editId, setEditId] = useState(null);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const [limit, setLimit] = useState(5);
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');

    const debouncedSearch = useDebounce(search, 500);

    const { data, isLoading } = useQuery({
        queryKey: ['tasks', page, debouncedSearch, limit, sortBy, sortOrder],
        queryFn: () => fetchTasks({ page, search: debouncedSearch, limit, sortBy, sortOrder }),
        initialData,
        keepPreviousData: true,
    });

    const taskMutation = useMutation({
        mutationFn: ({ title, editId }) => {
            return editId ? updateTask(editId, title) : createTask(title);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast.success(editId ? 'Task updated' : 'Task added');
            setTask('');
            setEditId(null);
        },
        onError: () => toast.error('Something went wrong'),
    });

    const deleteMutation = useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast.success('Task deleted');
        },
        onError: () => toast.error('Failed to delete task'),
    });

    const toggleMutation = useMutation({
        mutationFn: ({ id, completed }) => toggleTaskComplete(id, completed),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast.success('Task status updated');
        },
        onError: () => toast.error('Failed to update task'),
    });

    const handleAdd = () => {
        if (!task.trim()) return;
        taskMutation.mutate({ title: task, editId });
    };

    const handleEdit = (task) => {
        setTask(task.title);
        setEditId(task._id);
    };

    const handleDelete = (id) => {
        deleteMutation.mutate(id);
    };

    const handleToggle = (task) => {
        toggleMutation.mutate({ id: task._id, completed: !task.completed });
    };

    return (
        <div className="max-w-xl mx-auto py-10">

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Todo List</h2>
            </div>

            <div className="flex space-x-2 mb-4">
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder={editId ? 'Update task...' : 'Add new task'}
                    className="border p-2 rounded w-full"
                />
                <button
                    onClick={handleAdd}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {editId ? 'Update' : 'Add'}
                </button>
            </div>
            <div className="flex justify-between items-center mb-4 space-x-4">
                <select
                    value={limit}
                    onChange={(e) => {
                        setLimit(Number(e.target.value));
                        setPage(1);
                    }}
                    className="border p-2 rounded"
                >
                    {[5, 10, 20].map((num) => (
                        <option key={num} value={num}>
                            {num} per page
                        </option>
                    ))}
                </select>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="createdAt">Sort by Date</option>
                    <option value="title">Sort by Title</option>
                </select>

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <input
                type="text"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                }}
                placeholder="Search tasks"
                className="w-full border p-2 rounded mb-4"
            />



            {isLoading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <>
                    <ul className="space-y-2">
                        {data.tasks.map((t) => (
                            <li
                                key={t._id}
                                className="border p-3 rounded flex justify-between items-center"
                            >
                                <div>
                                    <input
                                        type="checkbox"
                                        checked={t.completed}
                                        onChange={() => handleToggle(t)}
                                        className="mr-2"
                                    />
                                    <span className={t.completed ? 'line-through text-gray-500' : ''}>
                                        {t.title}
                                    </span>
                                </div>
                                <div className="space-x-2">
                                    <button onClick={() => handleEdit(t)} className="text-blue-600 text-sm">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(t._id)} className="text-red-600 text-sm">
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="flex justify-center mt-4 space-x-2">
                        {Array.from({ length: data.totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i + 1)}
                                className={`px-3 py-1 rounded border ${
                                    page === i + 1 ? 'bg-blue-600 text-white' : ''
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
