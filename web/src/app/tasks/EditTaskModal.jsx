import { useEffect, useState } from 'react';

export default function EditTaskModal({ editId, taskTitle, onClose, onUpdate }) {
    const [title, setTitle] = useState(taskTitle || '');

    useEffect(() => {
        setTitle(taskTitle || '');
    }, [taskTitle]);

    const handleUpdate = () => {
        if (title.trim()) {
            onUpdate(title.trim());
        }
    };

    if (!editId) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded p-4 w-full max-w-md shadow-lg">
                <h3 className="text-lg font-semibold mb-2">Edit Task</h3>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 w-full rounded mb-4"
                />
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}