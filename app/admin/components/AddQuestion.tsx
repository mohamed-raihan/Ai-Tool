"use client";

import React, { useState } from 'react';
import { questionsService, CreateQuestionDto } from '@/app/services/questions.service';
import { toast } from 'react-toastify';

const categories = [
  'Introvert', 'Analytical', 'Realistic', 'Practical',
  'Artistic', 'Creative', 'Conventional', 'Organized',
  'Visual', 'Spatial', 'Auditory', 'Communication',
  'Extrovert', 'Social'
];

export default function AddQuestion() {
  const [formData, setFormData] = useState<CreateQuestionDto>({
    text: '',
    class_id: '',
    stream_id: '',
    category_id: ''
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      text: e.target.value
    }));
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      }
      if (prev.length >= 2) {
        return [prev[1], category]; // Keep last selected and add new
      }
      return [...prev, category];
    });

    setFormData(prev => ({
      ...prev,
      category: selectedCategories.join(',')
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (selectedCategories.length !== 2) {
        toast.error('Please select exactly two categories');
        return;
      }

      const questionData = {
        ...formData,
        category: selectedCategories.join(',')
      };

      await questionsService.createQuestion(questionData);
      toast.success('Question added successfully!');
      
      // Reset form
      setFormData({ text: '', class_id: '', stream_id: '', category_id: '' });
      setSelectedCategories([]);
    } catch (error) {
      toast.error('Failed to add question');
      console.error('Error adding question:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Question</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Question Text
          </label>
          <textarea
            value={formData.text}
            onChange={handleTextChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
            rows={4}
            placeholder="Enter your question here..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categories (select exactly 2)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategorySelect(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                  ${selectedCategories.includes(category)
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                  ${selectedCategories.length >= 2 && !selectedCategories.includes(category)
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                  }`}
                disabled={selectedCategories.length >= 2 && !selectedCategories.includes(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !formData.text || selectedCategories.length !== 2}
            className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Adding...' : 'Add Question'}
          </button>
        </div>
      </form>
    </div>
  );
} 