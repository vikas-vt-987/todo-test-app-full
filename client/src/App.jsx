import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [form, setForm] = useState({ todoText: "" });
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [clickedIds, setClickedIds] = useState([]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.todoText.trim() === "" || form.todoText.length <= 2) {
      alert("Todo can't be empty or too short.");
      return;
    }
    try {
      if (editId) {
        await axios.put(`http://localhost:3000/check/${editId}`, form);
        setEditId(null);
      } else {
        await axios.post("http://localhost:3000/check", form);
      }
      setForm({ todoText: "" });
      showData();
    } catch (err) {
      console.error(err);
    }
  };

  async function showData() {
    try {
      const myData = await axios.get(`http://localhost:3000/check`);
      setData(myData.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:3000/check/${id}`);
      showData();
    } catch (err) {
      console.log(err);
    }
  }

  const handleEdit = (todo) => {
    setEditId(todo._id);
    setForm({ todoText: todo.todoText });
  };

  useEffect(() => {
    showData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Todo App
        </h1>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <input
            name="todoText"
            type="text"
            value={form.todoText}
            onChange={handleChange}
            placeholder="Enter your todo..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className={`px-4 py-2 rounded-md text-white transition ${
              editId
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {editId ? "Update" : "Add"}
          </button>
        </form>

        <ul className="space-y-4">
          {data.length === 0 ? (
            <p className="text-gray-500 text-center">No todos added yet.</p>
          ) : (
            data.map((todo) => (
              <li
                key={todo._id}
                className="bg-gray-100 flex justify-between items-center px-4 py-3 rounded-md shadow"
              >
                <span
                  onClick={() => {
                    setClickedIds((prev) =>
                      prev.includes(todo._id)
                        ? prev.filter((id) => id !== todo._id)
                        : [...prev, todo._id]
                    );
                  }}
                  className={`cursor-pointer text-gray-800 ${
                    clickedIds.includes(todo._id)
                      ? "line-through text-gray-400"
                      : ""
                  }`}
                >
                  {todo.todoText}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(todo)}
                    className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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
