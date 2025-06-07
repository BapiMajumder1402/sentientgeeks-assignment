export default function TaskControls({
    search, setSearch,
    limit, setLimit,
    sortBy, setSortBy,
    sortOrder, setSortOrder
}) {
    return (
        <div className="space-y-2 mb-4">
            <input
                type="text"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
                placeholder="Search tasks"
                className="w-full border p-2 rounded"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <select
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    className="border p-2 rounded"
                >
                    {[5, 10, 20].map(num => (
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
        </div>
    );
}
