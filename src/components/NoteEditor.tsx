import React from 'react';
import { useForm } from 'react-hook-form';
import { Save, X } from 'lucide-react';
import { Note } from '../types';
import { useNotesStore } from '../store/notes';

interface NoteEditorProps {
  note?: Note;
  onClose: () => void;
}

export function NoteEditor({ note, onClose }: NoteEditorProps) {
  const addNote = useNotesStore((state) => state.addNote);
  const updateNote = useNotesStore((state) => state.updateNote);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: note?.title || '',
      content: note?.content || '',
    },
  });

  const onSubmit = (data: any) => {
    const timestamp = new Date().toISOString();
    if (note) {
      updateNote({
        ...note,
        ...data,
        updatedAt: timestamp,
      });
    } else {
      addNote({
        id: crypto.randomUUID(),
        userId: '1', // In a real app, this would come from the authenticated user
        ...data,
        createdAt: timestamp,
        updatedAt: timestamp,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">
            {note ? 'Edit Note' : 'New Note'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <div>
            <input
              {...register('title')}
              type="text"
              placeholder="Note Title"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <textarea
              {...register('content')}
              rows={8}
              placeholder="Write your note here..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
