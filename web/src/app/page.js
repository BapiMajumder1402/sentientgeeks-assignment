"use client";

export default function Home() {


  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <h1 className="text-4xl font-bold mb-4 text-gray-800 text-center">
        Welcome to TodoApp
      </h1>
      <p className="max-w-md text-center text-gray-600 mb-6">
        Organize your tasks easily and boost your productivity. Add, edit, and complete todos seamlessly with our intuitive interface.
      </p>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Sample Todo</h2>
        <ul className="space-y-3">
          <li className="flex items-center">
            <input type="checkbox" checked disabled className="mr-3" />
            <span className="line-through text-gray-400">Finish project documentation</span>
          </li>
          <li className="flex items-center">
            <input type="checkbox" disabled className="mr-3" />
            <span>Prepare for meeting</span>
          </li>
          <li className="flex items-center">
            <input type="checkbox" disabled className="mr-3" />
            <span>Buy groceries</span>
          </li>
        </ul>
      </div>
    </main>
  );
}
