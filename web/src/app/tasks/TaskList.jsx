export default function TaskList({
  data,
  page,
  setPage,
  isLoading,
  setTask,
  setEditId,
  editId,
  onDelete,
  onToggle,
}) {
  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <>
      <ul className="space-y-2">
{data?.tasks?.map((task) => (
  <li
    key={task._id}
    className="border p-3 rounded flex flex-col sm:flex-row sm:justify-between sm:items-center"
  >
    <div className="flex flex-col">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task)}
          className="mr-2"
        />
        <span className={task.completed ? 'line-through text-gray-500' : ''}>
          {task.title}
        </span>
      </div>
      <span className="text-xs text-gray-400 mt-1 ml-6">
        {new Date(task.createdAt).toLocaleString()}
      </span>
    </div>

    <div className="space-x-2 mt-2 sm:mt-0">
      {!task.completed && (
        <button
          onClick={() => {
            setTask(task.title);
            setEditId(task._id);
          }}
          className="text-blue-600 text-sm"
        >
          Edit
        </button>
      )}
      <button
        onClick={() => onDelete(task._id)}
        className="text-red-600 text-sm"
      >
        Delete
      </button>
    </div>
  </li>
))}

      </ul>

      <div className="flex justify-center mt-4 space-x-2 flex-wrap">
        {Array.from({ length: data?.totalPages || 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded border ${page === i + 1 ? 'bg-blue-600 text-white' : ''}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
}
