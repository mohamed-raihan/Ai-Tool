// app/test/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import QuestionCard from '../user/components/QuestionCard';

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: string;
  text: string;
  options: Option[];
}

export default function TestPage() {
  const router = useRouter();
  
  // Sample questions - in a real app, you'd fetch these from an API
  const questions: Question[] = [
    {
      id: '1',
      text: 'I prefer to work in a team rather than individually.',
      options: [
        { id: 'a', text: 'Strongly Disagree' },
        { id: 'b', text: 'Disagree' },
        { id: 'c', text: 'Neutral' },
        { id: 'd', text: 'Agree' },
        { id: 'e', text: 'Strongly Agree' },
      ],
    },
    {
      id: '2',
      text: 'I find it easy to adapt to new situations.',
      options: [
        { id: 'a', text: 'Strongly Disagree' },
        { id: 'b', text: 'Disagree' },
        { id: 'c', text: 'Neutral' },
        { id: 'd', text: 'Agree' },
        { id: 'e', text: 'Strongly Agree' },
      ],
    },
    {
      id: '3',
      text: 'I enjoy learning new skills and knowledge.',
      options: [
        { id: 'a', text: 'Strongly Disagree' },
        { id: 'b', text: 'Disagree' },
        { id: 'c', text: 'Neutral' },
        { id: 'd', text: 'Agree' },
        { id: 'e', text: 'Strongly Agree' },
      ],
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (optionId: string) => {
    setAnswers({
      ...answers,
      [questions[currentQuestionIndex].id]: optionId,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Submit the test
      console.log('Test completed', answers);
      // Navigate to results page
      router.push('/test/results');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Psychometric Assessment</h1>
          <p className="text-gray-600 mt-2">
            Please answer honestly for the most accurate results.
          </p>
        </header>

        <QuestionCard
          question={currentQuestion.text}
          options={currentQuestion.options}
          onAnswer={handleAnswer}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          selectedOption={answers[currentQuestion.id] || null}
        />

        <div className="mt-8 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!answers[currentQuestion.id]}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}