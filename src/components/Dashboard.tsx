import React, { useState } from 'react';
import { LogOut, Plus, BookOpen } from 'lucide-react';
import { useAuthStore } from '../store/auth';
import { NoteList } from './NoteList';
import { NoteEditor } from './NoteEditor';
import { Clock } from './Clock';
import { Note } from '../types';

export function Dashboard() {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | undefined>();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setEditingNote(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">Web Notebook</h1>
            </div>

            <div className="flex items-center gap-6">
              <Clock />
              <div className="flex items-center gap-4">
                <span className="text-gray-600">Welcome, {user?.name}</span>
                <button
                  onClick={() => logout()}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-gray-800">My Notes</h2>
          <button
            onClick={() => setIsEditorOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Plus className="w-4 h-4" />
            New Note
          </button>
        </div>

        <NoteList onEditNote={handleEditNote} />

        {isEditorOpen && (
          <NoteEditor note={editingNote} onClose={handleCloseEditor} />
        )}
      </main>
    </div>
  );
}
