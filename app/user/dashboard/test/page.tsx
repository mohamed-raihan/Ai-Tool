// app/test/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  questionsService,
  Question,
} from "../../../services/questions.service";
import { toast } from "react-toastify";
import TestTimer from "./timer/page";
import { calculateScores } from "../report/page";
import QuestionCard from "../../components/QuestionCard";
import SignupModal from "../../../components/authentication/SignupModal";
import { PersonalityService } from "../../../services/personality.service";
import { Answer } from "../../../types/test";

interface Option {
  id: string;
  text: string;
}

interface QuestionWithOptions extends Question {
  options: Option[];
}

export default function TestPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<QuestionWithOptions[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const QUESTIONS_PER_PAGE = 7;

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const data = await questionsService.getQuestions();
      // Transform the questions to include options
      const questionsWithOptions = data.map((question) => ({
        ...question,
        options: [
          { id: "1", text: "Yes" },
          { id: "0", text: "No" },
        ],
      }));
      setQuestions(questionsWithOptions);
    } catch (error) {
      toast.error("Failed to fetch questions");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (questionId: string, optionId: string) => {
    setAnswers({
      ...answers,
      [questionId]: optionId,
    });
  };

  console.log(answers);

  const handleSubmit = async () => {
    console.log("answers");
    // Split answers into two parts
    const aptitudeAnswers: Record<string, string> = {};
    const personalityAnswers: Record<string, string> = {};

    // First 12 questions for aptitude test
    Object.entries(answers).forEach(([questionId, answer]) => {
      if (parseInt(questionId) <= 12) {
        aptitudeAnswers[questionId] = answer;
      } else {
        personalityAnswers[questionId] = answer;
      }
    });

    // Format questions for aptitude score calculation
    const aptitudeQuestions = questions
      .filter((q) => parseInt(q.id) <= 12)
      .map((q) => ({
        id: q.id,
        category: q.category,
      }));

    // Format answers for personality test
    const personalityTestAnswers: Answer[] = Object.entries(
      personalityAnswers
    ).map(([questionId, answer]) => ({
      questionId: parseInt(questionId),
      answer: answer === "1" ? "yes" : ("no" as const),
    }));

    try {
      // Calculate aptitude test results
      const aptitudeResults = calculateScores(
        aptitudeAnswers,
        aptitudeQuestions
      );

      // Calculate personality test results
      const personalityService = new PersonalityService();
      const personalityResults = personalityService.calculatePersonalityTraits(
        personalityTestAnswers
      );

      console.log("Personality Results:", personalityResults); // Debug log

      // Store both results in localStorage
      localStorage.setItem("aptitudeResults", JSON.stringify(aptitudeResults));
      localStorage.setItem(
        "personalityResults",
        JSON.stringify(personalityResults)
      );

      // Open signup modal instead of navigating to results
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error calculating results:", error);
      toast.error("Failed to calculate test results");
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(questions.length / QUESTIONS_PER_PAGE) - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      // Submit the test
      handleSubmit();
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleTimeUp = () => {
    toast.warning("Time is up! Submitting your test...");
    handleSubmit();
  };

  const handleModalSubmit = async (data: {
    name: string;
    phone_number: string;
    email: string;
    password: string;
  }) => {
    try {
      // Here you would typically make an API call to register the user
      console.log("Signup data:", data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // After successful signup, navigate to results
      router.push("/user/dashboard/test/results");
    } catch (error) {
      throw new Error("Failed to sign up. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading questions...</p>
        </div>
      </div>
    );
  }

  // Calculate paginated questions
  const startIdx = currentPage * QUESTIONS_PER_PAGE;
  const endIdx = startIdx + QUESTIONS_PER_PAGE;
  const paginatedQuestions = questions.slice(startIdx, endIdx);
  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

  console.log(questions);

  return (
    <div className="min-h-screen bg-gray-900 bg-cover bg-center bg-no-repeat py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-100">
            Psychometric Assessment
          </h1>
          <p className="text-gray-400 mt-2">
            Please answer honestly for the most accurate results.
          </p>
          <div className="mt-4">
            <TestTimer duration={1800} onTimeUp={handleTimeUp} />
          </div>
        </header>

        {/* Progress Bar */}
        <div className="sticky top-0 w-full bg-gray-900/95 backdrop-blur-sm py-4 z-50">
          <div className="max-w-5xl mx-auto w-full px-4">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Progress</span>
              <span>
                {Math.round(
                  (Object.keys(answers).length / questions.length) * 100
                )}
                %
              </span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 transition-all duration-300 ease-in-out"
                style={{
                  width: `${
                    (Object.keys(answers).length / questions.length) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-8 rounded-lg border border-gray-900 flex flex-col items-center mt-4">
          <div className="mb-4 w-full text-center">
            <span className="text-sm font-medium text-gray-400">
              Page {currentPage + 1} of {totalPages}
            </span>
          </div>

          {/* Render 7 questions per page */}
          <div className="w-full space-y-10 mb-10">
            {paginatedQuestions.map((question, idx) => (
              <div key={question.id} className="mb-6 shadow-lg py-10">
                <h2 className="text-xl font-semibold text-gray-100 mb-6 text-center">
                  {startIdx + idx + 1}. {question.text}
                </h2>
                <div className="flex items-center justify-center space-x-16">
                  {/* Yes Option */}
                  <label className="flex flex-col items-center cursor-pointer">
                    <span className="mb-2 text-lg text-green-400 font-semibold">
                      Yes
                    </span>
                    <input
                      type="radio"
                      name={`answer-${question.id}`}
                      value="1"
                      checked={answers[question.id] === "1"}
                      onChange={() => handleAnswer(question.id, "1")}
                      className="hidden"
                    />
                    <span
                      className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-colors duration-200
                        ${
                          answers[question.id] === "1"
                            ? "border-green-400 bg-green-900/30"
                            : "border-gray-600 bg-gray-900"
                        }
                      `}
                    >
                      {answers[question.id] === "1" && (
                        <span className="w-8 h-8 bg-green-400 rounded-full block"></span>
                      )}
                    </span>
                  </label>
                  {/* No Option */}
                  <label className="flex flex-col items-center cursor-pointer">
                    <span className="mb-2 text-lg text-red-400 font-semibold">
                      No
                    </span>
                    <input
                      type="radio"
                      name={`answer-${question.id}`}
                      value="0"
                      checked={answers[question.id] === "0"}
                      onChange={() => handleAnswer(question.id, "0")}
                      className="hidden"
                    />
                    <span
                      className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-colors duration-200
                        ${
                          answers[question.id] === "0"
                            ? "border-red-400 bg-red-900/30"
                            : "border-gray-600 bg-gray-900"
                        }
                      `}
                    >
                      {answers[question.id] === "0" && (
                        <span className="w-8 h-8 bg-red-400 rounded-full block"></span>
                      )}
                    </span>
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-1 flex justify-center w-full">
            {/* <button
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
              className="px-4 py-2 border border-gray-700 rounded-md text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:hover:bg-transparent"
            >
              Previous
            </button> */}
            <button
              onClick={handleNextPage}
              disabled={paginatedQuestions.some((q) => !answers[q.id])}
              className="px-5 py-2 text-2xl bg-orange-500 text-white rounded-full hover:bg-orange-600 disabled:opacity-50"
            >
              {currentPage === totalPages - 1 ? "Submit" : "Next →"}
            </button>
          </div>
        </div>
      </div>

      <SignupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}
