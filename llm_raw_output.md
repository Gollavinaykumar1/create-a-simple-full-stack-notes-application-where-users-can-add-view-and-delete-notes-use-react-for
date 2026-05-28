# LLM Output

### FILE: src/App.jsx
```jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { clsx } from 'clsx';
import { FiPlus, FiTrash2, FiEdit } from 'react-icons/fi';

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function App() {
  const [notes, setNotes] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentNote, setCurrentNote] = useState({});

  const { register, handleSubmit, reset } = useForm();

  const fetchNotes = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/notes`);
      setNotes(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleCreateNote = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/notes`, data);
      setNotes((prevNotes) => [...prevNotes, response.data]);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/notes/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditNote = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/notes/${id}`);
      setCurrentNote(response.data);
      setEditing(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateNote = async (data) => {
    try {
      await axios.put(`${BASE_URL}/notes/${currentNote._id}`, data);
      setNotes((prevNotes) => prevNotes.map((note) => (note._id === currentNote._id ? { ...note, ...data } : note)));
      setEditing(false);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Notes App</h1>
        <Link to="/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <FiPlus className="mr-2" /> Create Note
        </Link>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <div className="grid grid-cols-1 gap-4">
              {notes.map((note) => (
                <div key={note._id} className="bg-white p-4 shadow-md rounded">
                  <h2 className="text-lg font-bold">{note.title}</h2>
                  <p className="text-gray-600">{note.content}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-gray-600 text-sm">
                      Created at: {format(new Date(note.createdAt), 'yyyy-MM-dd HH:mm')}
                    </span>
                    <div className="flex items-center">
                      <button
                        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={() => handleEditNote(note._id)}
                      >
                        <FiEdit className="mr-2" /> Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDeleteNote(note._id)}
                      >
                        <FiTrash2 className="mr-2" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }
        />
        <Route
          path="/create"
          element={
            <div className="bg-white p-4 shadow-md rounded">
              <h2 className="text-lg font-bold">Create Note</h2>
              <form onSubmit={handleSubmit(editing ? handleUpdateNote : handleCreateNote)}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Title
                  </label>
                  <input
                    {...register('title')}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="title"
                    type="text"
                    placeholder="Note title"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                    Content
                  </label>
                  <textarea
                    {...register('content')}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="content"
                    placeholder="Note content"
                  />
                </div>
                <button
                  className={clsx(
                    'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
                    editing ? 'bg-green-500 hover:bg-green-700' : ''
                  )}
                  type="submit"
                >
                  {editing ? 'Update Note' : 'Create Note'}
                </button>
              </form>
            </div>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
=== END ===

=== FILE: src/main.jsx ===
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
=== END ===

=== FILE: src/index.css ===
@tailwind base;
@tailwind components;
@tailwind utilities;
=== END ===

=== FILE: src/api.js ===
// This file is not needed as we are making API calls directly in the App component
// However, you can create a separate API file if you want to keep your API calls organized
export const api = axios.create({
  baseURL: BASE_URL,
});
=== END ===
```