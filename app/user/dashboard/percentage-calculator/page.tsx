"use client";
import Image from "next/image";
import React, { useState } from "react";

const gradeOptions = [
  { label: "A+", value: 99.5 },
  { label: "A", value: 95.5 },
  { label: "B+", value: 88 },
  { label: "B", value: 84.5 },
  { label: "C+", value: 78 },
  { label: "C", value: 74.5 },
  { label: "D+", value: 68 },
  { label: "D", value: 65.5 },
  { label: "F", value: 60 },
];

type Subject = {
  name: string;
  grade: number;
};

export default function PercentageCalculatorPage() {
  const [subjects, setSubjects] = useState<Subject[]>([
    { name: "", grade: gradeOptions[0].value },
  ]);

  const handleSubjectChange = (
    index: number,
    field: "name" | "grade",
    value: string | number
  ) => {
    setSubjects((prev) =>
      prev.map((subj, i) => (i === index ? { ...subj, [field]: value } : subj))
    );
  };

  const addSubject = () => {
    setSubjects((prev) => [
      ...prev,
      { name: "", grade: gradeOptions[0].value },
    ]);
  };

  const removeSubject = (index: number) => {
    setSubjects((prev) => prev.filter((_, i) => i !== index));
  };

  const average =
    subjects.length > 0
      ? (
          subjects.reduce((sum, subj) => sum + Number(subj.grade), 0) /
          subjects.length
        ).toFixed(2)
      : "0.00";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#dbefe9] via-[#f1f5f9] to-[#0f172a] dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 flex flex-col items-center justify-start">
      {/* Header */}
      <div className="w-full bg-[#264653] relative py-30  px-6 sm:px-10 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl mx-auto md:mx-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            Percentage Calculator
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg mb-2">
            Calculate your high school percentage, learn how to convert your
            class grades to percentage.
          </p>
        </div>
        <div className="hidden md:block absolute -bottom-1 right-20">
          <Image
            src="/percentage.png"
            alt="Percentage Calculator"
            width={300}
            height={300}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-10 md:gap-16 lg:gap-20 mt-[-60px] z-10 relative px-4 sm:px-6 lg:px-0">
        {/* Calculator Card */}
        <div className="w-full lg:w-1/2 bg-white dark:bg-[#18181b] rounded-2xl shadow-2xl p-6 sm:p-8 relative mb-20 md:mt-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Semester 1
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-4 text-sm sm:text-base">
              <thead>
                <tr className="bg-white dark:bg-[#18181b] text-gray-900 dark:text-white text-left">
                  <th className="py-3 px-4 font-semibold border-b border-gray-200 dark:border-gray-700">
                    Subject
                  </th>
                  <th className="py-3 px-4 font-semibold border-b border-gray-200 dark:border-gray-700">
                    Grade
                  </th>
                  <th className="py-3 px-4 font-semibold border-b border-gray-200 dark:border-gray-700"></th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject, idx) => (
                  <tr
                    key={idx}
                    className="bg-white dark:bg-[#18181b] border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                  >
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        className="bg-transparent border-none w-full text-gray-900 dark:text-white focus:outline-none"
                        placeholder={`Subject ${idx + 1}`}
                        value={subject.name}
                        onChange={(e) =>
                          handleSubjectChange(idx, "name", e.target.value)
                        }
                      />
                    </td>
                    <td className="py-3 px-4">
                      <select
                        className="bg-transparent border-none w-full text-gray-900 dark:text-white focus:outline-none appearance-none"
                        value={subject.grade}
                        onChange={(e) =>
                          handleSubjectChange(
                            idx,
                            "grade",
                            Number(e.target.value)
                          )
                        }
                      >
                        {gradeOptions.map((opt) => (
                          <option
                            key={opt.label}
                            value={opt.value}
                            className="text-gray-900 dark:text-white bg-white dark:bg-[#18181b]"
                          >
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {subjects.length > 1 && (
                        <button
                          className="text-gray-400 hover:text-red-500 text-2xl font-bold transition-colors"
                          onClick={() => removeSubject(idx)}
                          aria-label="Remove subject"
                        >
                          &times;
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
            <div className="flex items-center gap-2 text-lg">
              <span className="font-medium text-gray-900 dark:text-white">
                Percentage:
              </span>
              <span className="font-bold text-2xl text-gray-900 dark:text-white">
                {average}
              </span>
            </div>
            <button
              className="flex items-center gap-2 border border-blue-400 text-blue-500 dark:text-blue-300 dark:border-blue-300 px-4 py-2 rounded-md font-medium hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
              onClick={addSubject}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.75v14.5m7.25-7.25H4.75"
                />
              </svg>
              Add courses
            </button>
          </div>

          <hr className="my-4 border-gray-200 dark:border-gray-700" />

          <div>
            <div className="h-10"></div>
            {/* Circular Percentage Display */}
            <div className="absolute -bottom-9 right-4 sm:right-6 md:right-10 bg-transparent hidden sm:block">
              <div className="flex flex-col items-center">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg
                    className="absolute top-0 left-0 w-full h-full"
                    viewBox="0 0 36 36"
                  >
                    <path
                      className="text-gray-200 dark:text-gray-700"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    />
                    <path
                      className="text-green-400"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeDasharray={`${(Number(average) / 100) * 100}, 100`}
                    />
                  </svg>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white z-10">
                    {average}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="w-full lg:w-1/2 px-2 md:mt-20">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Using percentage calculator
          </h2>
          <p className="text-gray-700 text-justify dark:text-gray-300 text-lg mb-2">
            Enter the name, letter grade and credit hours (usually 1) for each
            of your classes, beginning with your first semester or year in high
            school. If you&apos;re taking weighted classes (Honors, AP/IB or
            College), switch the &apos;weighted&apos; toggle on to account for their
            difficulty.
            <br />
            <br />
            Add extra classes, semesters or years using the blue buttons, and
            remove items using the delete buttons (X) to the right. The
            calculator will save your data for the next time you visit.
          </p>
        </div>
      </div>
    </div>
  );
}
