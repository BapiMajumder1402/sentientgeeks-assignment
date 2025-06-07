export default function TaskForm({ task, setTask, editId, onSubmit }) {
  const handleSubmit = () => {
    if (!task.trim()) return;
    onSubmit(task);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-4">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder={editId ? 'Update task...' : 'Add new task'}
        className="border p-2 rounded flex-grow"
      />
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
        {editId ? 'Update' : 'Add'}
      </button>
    </div>
  );
}
