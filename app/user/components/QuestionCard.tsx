// app/components/QuestionCard.tsx
"use client";

import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import TestTimer from "../dashboard/test/timer/page";
import { useRouter } from "next/navigation";

interface Option {
  id: number;
  text: string;
}

interface QuestionProps {
  question: string;
  options: Option[];
  onAnswer: (optionId: number) => void;
  questionNumber: number;
  totalQuestions: number;
  selectedOption: number | undefined;
}

const QuestionCard: React.FC<QuestionProps> = ({
  question,
  options,
  onAnswer,
  questionNumber,
  totalQuestions,
  selectedOption,
}) => {
  const handleOptionClick = (optionId: number) => {
    onAnswer(optionId);
  };

  console.log("options",options);
  console.log("selectedoptions",selectedOption);
  
  

  const [testEnded, setTestEnded] = useState(false);
  const router = useRouter();

  console.log("testEnded",testEnded);

  const handleTimeUp = () => {
    setTestEnded(true);
    alert("Time's up! Submitting your test...");
    setTimeout(() => {
      router.push("/user/dashboard/test/results");
    }, 500); 
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* Progress indicator */}
      <div className="bg-gray-50 px-6 py-4">
      <div className="flex justify-end">
        <TestTimer duration={1 * 60} onTimeUp={handleTimeUp} /> {/* 5 mins */}
      </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className="w-48 bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="px-6 py-8">
        <h2 className="text-xl font-medium text-gray-800 mb-8">{question}</h2>

        {/* Options */}
        <div className="space-y-4">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              className={`w-full text-left px-5 py-4 rounded-lg border-2 flex justify-between items-center transition-all ${
                selectedOption === option.id
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className="text-gray-700">{option.text}</span>
              {selectedOption === option.id && (
                <CheckCircle className="text-orange-500 h-5 w-5" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
