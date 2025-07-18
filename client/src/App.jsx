import React, { useEffect, useState } from "react";
import axios from "axios";

// ✅ Load API URL from environment variable
const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [form, setForm] = useState({ todoText: "" });
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [clickedIds, setClickedIds] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.todoText.trim() === "" || form.todoText.length <= 2) {
      alert("Todo can't be empty or too short.");
      return;
    }
    try {
      if (editId) {
        await axios.put(`${API_URL}/check/${editId}`, form);
        setEditId(null);
      } else {
        await axios.post(`${API_URL}/check`, form);
      }
      setForm({ todoText: "" });
      showData();
    } catch (err) {
      console.error(err);
    }
  };

  const showData = async () => {
    try {
      const myData = await axios.get(`${API_URL}/check`);
      setData(myData.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/check/${id}`);
      showData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (todo) => {
    setEditId(todo._id);
    setForm({ todoText: todo.todoText });
  };

  useEffect(() => {
    showData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex justify-center items-start sm:items-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-700 mb-4 sm:mb-6">
          Todo App
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            name="todoText"
            type="text"
            value={form.todoText}
            onChange={handleChange}
            placeholder="Enter your todo..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <button
            type="submit"
            className={`px-4 py-2 rounded-md text-white text-sm sm:text-base transition ${
              editId
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {editId ? "Update" : "Add"}
          </button>
        </form>

        <ul className="space-y-3 sm:space-y-4">
          {data.length === 0 ? (
            <p className="text-gray-500 text-center">No todos added yet.</p>
          ) : (
            data.map((todo) => (
              <li
                key={todo._id}
                className="bg-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-3 rounded-md shadow"
              >
                <span
                  onClick={() => {
                    setClickedIds((prev) =>
                      prev.includes(todo._id)
                        ? prev.filter((id) => id !== todo._id)
                        : [...prev, todo._id]
                    );
                  }}
                  className={`cursor-pointer text-gray-800 break-words ${
                    clickedIds.includes(todo._id)
                      ? "line-through text-gray-400"
                      : ""
                  }`}
                >
                  {todo.todoText}
                </span>

                <div className="flex gap-2 mt-2 sm:mt-0 self-end">
                  <button
                    onClick={() => handleEdit(todo)}
                    className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default App;
