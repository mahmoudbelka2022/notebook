import React from 'react';
import { Clock, Edit2, Trash2 } from 'lucide-react';
import { useNotesStore } from '../store/notes';
import { Note } from '../types';

interface NoteListProps {
  onEditNote: (note: Note) => void;
}

export function NoteList({ onEditNote }: NoteListProps) {
  const notes = useNotesStore((state) => state.notes);
  const deleteNote = useNotesStore((state) => state.deleteNote);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <div
          key={note.id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-800 flex-1">
              {note.title}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => onEditNote(note)}
                className="p-1 hover:bg-purple-100 rounded-full text-purple-600"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteNote(note.id)}
                className="p-1 hover:bg-red-100 rounded-full text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-3">{note.content}</p>

          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            <span>{formatDate(note.updatedAt)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
