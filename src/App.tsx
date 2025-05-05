import React, { useState, useEffect } from 'react';
import { Prompt } from './types';
import { PromptModal } from './components/PromptModal';
import { db } from './db';

function App() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'title' | 'createdAt'>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | undefined>();

  useEffect(() => {
    loadPrompts();
  }, []);

  const loadPrompts = async () => {
    const allPrompts = await db.prompts.toArray();
    setPrompts(allPrompts);
  };

  const handleSavePrompt = async (promptData: Omit<Prompt, 'id' | 'createdAt' | 'modifiedAt'>) => {
    if (editingPrompt) {
      await db.prompts.update(editingPrompt.id, {
        ...promptData,
        modifiedAt: new Date(),
      });
    } else {
      await db.prompts.add({
        ...promptData,
        id: Date.now(),
        createdAt: new Date(),
        modifiedAt: new Date(),
      });
    }
    await loadPrompts();
    setIsModalOpen(false);
    setEditingPrompt(undefined);
  };

  const handleDeletePrompt = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this prompt?')) {
      await db.prompts.delete(id);
      await loadPrompts();
    }
  };

  const handleEditPrompt = (prompt: Prompt) => {
    setEditingPrompt(prompt);
    setIsModalOpen(true);
  };

  const filteredPrompts = prompts
    .filter(prompt => {
      const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.promptText.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.every(tag => prompt.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    })
    .sort((a, b) => {
      if (sortBy === 'title') {
        return sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else {
        return sortOrder === 'asc'
          ? a.createdAt.getTime() - b.createdAt.getTime()
          : b.createdAt.getTime() - a.createdAt.getTime();
      }
    });

  const allTags = Array.from(new Set(prompts.flatMap(p => p.tags)));

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <h1 className="text-3xl font-bold text-gray-900">Prompt Organizer</h1>
            <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
              <input
                type="text"
                placeholder="Search prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => setSortBy('title')}
                  className={`px-3 py-2 rounded-md ${
                    sortBy === 'title'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Sort by Title
                </button>
                <button
                  onClick={() => setSortBy('createdAt')}
                  className={`px-3 py-2 rounded-md ${
                    sortBy === 'createdAt'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Sort by Date
                </button>
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md"
                >
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => {
                  setSelectedTags(prev =>
                    prev.includes(tag)
                      ? prev.filter(t => t !== tag)
                      : [...prev, tag]
                  );
                }}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map(prompt => (
            <div
              key={prompt.id}
              className="group bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow relative"
            >
              <h2 className="text-xl font-semibold mb-2">{prompt.title}</h2>
              <div className="mb-4">
                <div className="text-gray-800 font-mono whitespace-pre-line break-words">
                  {prompt.promptText}
                </div>
                <div className="absolute inset-0 bg-white bg-opacity-95 flex items-center justify-center px-4 py-6 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                  <span className="text-gray-600 text-center">{prompt.description}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {prompt.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleEditPrompt(prompt)}
                  className="px-3 py-1 text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePrompt(prompt.id)}
                  className="px-3 py-1 text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </main>

      <PromptModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPrompt(undefined);
        }}
        onSave={handleSavePrompt}
        prompt={editingPrompt}
      />
    </div>
  );
}

export default App;
