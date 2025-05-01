"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function InstructionsPage() {
  const router = useRouter();
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    // Get student name from localStorage if available
    const storedName = localStorage.getItem("studentName");
    if (storedName) {
      setStudentName(storedName);
    }
  }, []);

  const handleStartTest = () => {
    router.push("/user/dashboard/test");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
            Welcome{studentName ? `, ${studentName}` : ""}!
          </h1>
          <p className="text-lg text-gray-400">
            Ready to discover your career path? Let's begin your assessment.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700/50 p-6 md:p-8">
          {/* Quick Facts */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-900/50 p-4 rounded-xl text-center">
              <div className="text-orange-500 text-2xl font-bold mb-1">20</div>
              <div className="text-gray-400 text-sm">Questions</div>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-xl text-center">
              <div className="text-orange-500 text-2xl font-bold mb-1">30</div>
              <div className="text-gray-400 text-sm">Minutes</div>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-xl text-center">
              <div className="text-orange-500 text-2xl font-bold mb-1">6</div>
              <div className="text-gray-400 text-sm">Categories</div>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-xl text-center">
              <div className="text-orange-500 text-2xl font-bold mb-1">
                100%
              </div>
              <div className="text-gray-400 text-sm">Accuracy</div>
            </div>
          </div>

          {/* Instructions Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Test Format */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Test Format
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-orange-500 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-300">Simple Yes/No questions</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-orange-500 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-300">7 questions per page</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-orange-500 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-300">30-minute time limit</span>
                </li>
              </ul>
            </div>

            {/* Important Notes */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Important Notes
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-orange-500 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-300">
                    Answer honestly - no right or wrong answers
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-orange-500 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-300">Complete in one sitting</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-orange-500 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-300">
                    Find a quiet, distraction-free space
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* What You'll Get */}
          <div className="mt-8 p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              What You'll Get
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-orange-500 mb-2">
                  <svg
                    className="w-8 h-8 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div className="text-sm text-gray-300">Personality Profile</div>
              </div>
              <div className="text-center">
                <div className="text-orange-500 mb-2">
                  <svg
                    className="w-8 h-8 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="text-sm text-gray-300">Career Matches</div>
              </div>
              <div className="text-center">
                <div className="text-orange-500 mb-2">
                  <svg
                    className="w-8 h-8 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <div className="text-sm text-gray-300">Strengths Analysis</div>
              </div>
              <div className="text-center">
                <div className="text-orange-500 mb-2">
                  <svg
                    className="w-8 h-8 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div className="text-sm text-gray-300">Growth Path</div>
              </div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="flex justify-center">
          <button
            onClick={handleStartTest}
            className="px-8 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center font-medium text-lg shadow-lg shadow-orange-500/20 group"
          >
            Start Assessment
            <svg
              className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
