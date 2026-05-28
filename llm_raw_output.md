# LLM Output

=== FILE: src/App.jsx ===
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { FiPlus } from 'react-icons/fi';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { clsx } from 'clsx';

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const fetchNotes = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/notes`);
      setNotes(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleAddNote = useCallback(async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/notes`, data);
      setNotes([...notes, response.data]);
      reset();
      setIsAddingNote(false);
    } catch (error) {
      console.error(error);
    }
  }, [notes, reset]);

  const handleEditNote = useCallback(async (data) => {
    try {
      const response = await axios.put(`${BASE_URL}/notes/${selectedNote.id}`, data);
      setNotes(notes.map((note) => note.id === selectedNote.id ? response.data : note));
      reset();
      setIsEditingNote(false);
    } catch (error) {
      console.error(error);
    }
  }, [selectedNote, notes, reset]);

  const handleDeleteNote = useCallback(async (id) => {
    try {
      await axios.delete(`${BASE_URL}/notes/${id}`);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error(error);
    }
  }, [notes]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleCreateNoteClick = () => {
    setIsAddingNote(true);
  };

  const handleEditNoteClick = (note) => {
    setSelectedNote(note);
    setIsEditingNote(true);
  };

  const handleCancelClick = () => {
    setIsAddingNote(false);
    setIsEditingNote(false);
    reset();
  };

  return (
    <HashRouter>
      <div className="max-w-5xl mx-auto p-4 mt-10">
        <h1 className="text-3xl font-bold mb-4">Notes</h1>
        <div className="flex justify-between mb-4">
          <button
            className={clsx(
              'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
              isAddingNote || isEditingNote ? 'hidden' : 'block'
            )}
            onClick={handleCreateNoteClick}
          >
            <FiPlus className="mr-2" /> Create Note
          </button>
          <button
            className={clsx(
              'bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded',
              isAddingNote || isEditingNote ? 'block' : 'hidden'
            )}
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
        {isAddingNote || isEditingNote ? (
          <form
            className="mb-4"
            onSubmit={handleSubmit(isAddingNote ? handleAddNote : handleEditNote)}
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                {...register('title', { required: true })}
                defaultValue={selectedNote?.title}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                Content
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="content"
                {...register('content', { required: true })}
                defaultValue={selectedNote?.content}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              {isAddingNote ? 'Create Note' : 'Edit Note'}
            </button>
          </form>
        ) : (
          <div className="grid grid-cols-1 gap-4 mb-4">
            {notes.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded shadow p-4 flex justify-between"
              >
                <div>
                  <h2 className="text-lg font-bold mb-2">{note.title}</h2>
                  <p className="text-sm text-gray-700 mb-2">{note.content}</p>
                  <p className="text-sm text-gray-700">
                    Created at {format(new Date(note.createdAt), 'yyyy-MM-dd HH:mm:ss')}
                  </p>
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => handleEditNoteClick(note)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </HashRouter>
  );
};

export default App;
=== END ===

=== FILE: src/main.jsx ===
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
=== END ===

=== FILE: src/index.css ===
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-gray-100;
}
=== END ===

=== FILE: src/api.js ===
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
=== END ===