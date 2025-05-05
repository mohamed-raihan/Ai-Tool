"use client";

import { useState, useEffect } from "react";
import {
  questionsService,
  Question,
  CreateQuestionDto,
} from "../../services/questions.service";
import { toast } from "react-toastify";
import { FiEdit2, FiTrash2, FiX, FiCheck } from "react-icons/fi";
import { API_URL } from "@/app/services/api_url";
import api from "@/app/lib/axios";
import { Select } from "@react-pdf/renderer";

interface Class {
  id: number;
  name: string;
  streams: { id: number; name: string }[];
}

interface Category {
  id: number;
  name: string;
}

function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedStreams, setSelectedStreams] = useState<
    { id: number; name: string }[]
  >([]);
  const [newQuestion, setNewQuestion] = useState<CreateQuestionDto>({
    text: "",
    category_id: "",
    class_id: "",
    stream_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<CreateQuestionDto>({
    text: "",
    category_id: "",
    class_id: "",
    stream_id: "",
  });
  const [filterClass, setFilterClass] = useState<string>("");
  const [filterStreams, setFilterStreams] = useState<
    { id: number; name: string }[]
  >([]);
  const [filterStream, setFilterStream] = useState<string>("");

  useEffect(() => {
    fetchQuestions();
    fetchClasses();
    fetchCategories();
  }, []);

  const fetchQuestions = async () => {
    try {
      const data = await questionsService.getQuestions();
      console.log(data);
      setQuestions(data);
    } catch (error) {
      toast.error("Failed to fetch questions",{autoClose: 1000});
      console.error("Error fetching questions:", error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await api.get(API_URL.STUDYING.GET_CLASSES);
      console.log(response.data);
      setClasses(response.data);
    } catch (error) {
      toast.error("Failed to fetch classes");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get(API_URL.ADMIN.CATEGORY);
      setCategories(response.data);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.text.trim() || !newQuestion.category_id.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    console.log(newQuestion);
    try {
      await questionsService.createQuestion(newQuestion);
      toast.success("Question added successfully",{autoClose: 1000});
      setNewQuestion({ text: "", category_id: "", class_id: "", stream_id: "" }); // Clear form
      fetchQuestions(); // Refresh questions list
    } catch (error) {
      toast.error("Failed to add question");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this question?")) {
      return;
    }

    try {
      await questionsService.deleteQuestion(id);
      toast.success("Question deleted successfully");
      fetchQuestions(); // Refresh the list
    } catch (error) {
      toast.error("Failed to delete question");
    }
  };

  const startEditing = (question: Question) => {
    console.log(
      question.class_name?.toString(),
      question.stream_name?.toString()
    );
    setEditingId(question.id);
    setEditForm({
      text: question.text,
      category_id: question.category.toString(),
      class_id: question.class_name?.toString() || "",
      stream_id: question.stream_name?.toString() || "",
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({ text: "", category_id: "", class_id: "", stream_id: "" });
  };

  const handleUpdate = async (id: string) => {
    if (!editForm.text.trim() || !editForm.category_id.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    console.log(editForm);
    try {
      await questionsService.updateQuestion(id, editForm);
      toast.success("Question updated successfully");
      setEditingId(null);
      fetchQuestions(); // Refresh the list
    } catch (error) {
      toast.error("Failed to update question");
    }
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClassId = parseInt(e.target.value);
    const selectedClass = classes.find((c) => c.id === selectedClassId);

    setNewQuestion((prev) => ({
      ...prev,
      class_id: e.target.value,
      stream_id: "", // Reset stream when class changes
    }));

    setSelectedStreams(selectedClass?.streams || []);
  };

  const handleFilterClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClassId = parseInt(e.target.value);
    const selectedClass = classes.find((c) => c.id === selectedClassId);

    setFilterClass(e.target.value);
    setFilterStream(""); // Reset stream when class changes
    setFilterStreams(selectedClass?.streams || []);
  };

  const filteredQuestions = questions.filter((question) => {
    if (!filterClass) return true;
    console.log(question.class_name?.id, parseInt(filterClass));
    if (question.class_name?.id !== parseInt(filterClass)) return false;
    if (!filterStream) return true;
    console.log(question.stream_name?.id, parseInt(filterStream));
    return question.stream_name?.id === parseInt(filterStream);
  });

  return (
    <div className="min-h-screen h-[100vh] bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-100 mb-8 text-left">
        Manage Questions
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Add New Question */}
        <div className="w-full lg:w-3/5">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
              Add New Question
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="class"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Class
                    </label>
                    <select
                      id="class"
                      value={newQuestion.class_id}
                      onChange={handleClassChange}
                      className="w-full px-3 py-2 bg-gray-700 border-gray-600 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    >
                      <option value="">Select Class</option>
                      {classes.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="stream"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Stream
                    </label>
                    <select
                      id="stream"
                      value={newQuestion.stream_id}
                      onChange={(e) =>
                        setNewQuestion({
                          ...newQuestion,
                          stream_id: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-gray-700 border-gray-600 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    >
                      <option value="">Select Stream</option>
                      {selectedStreams.map((stream) => (
                        <option key={stream.id} value={stream.id}>
                          {stream.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Question Text
                  </label>
                  <textarea
                    id="text"
                    value={newQuestion.text}
                    onChange={(e) =>
                      setNewQuestion({ ...newQuestion, text: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-700 border-gray-600 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    rows={7}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    value={newQuestion.category_id}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        category_id: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-gray-700 border-gray-600 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {loading ? "Adding..." : "Add Question"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column - Existing Questions */}
        <div className="w-full lg:w-2/5">
          <div className="space-y-4 bg-gray-800 rounded-lg border border-gray-700 overflow-y-auto p-3 h-[80vh]">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
              Existing Questions
            </h2>

            {/* Filter Controls */}
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mb-4">
              <h3 className="text-lg font-medium text-gray-100 mb-3">
                Filter Questions
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <select
                    value={filterClass}
                    onChange={handleFilterClassChange}
                    className="w-full px-3 py-2 bg-gray-700 border-gray-600 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Filter by classes</option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    value={filterStream}
                    onChange={(e) => setFilterStream(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border-gray-600 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    disabled={!filterClass}
                  >
                    <option value="">Filter by streams</option>
                    {filterStreams.map((stream) => (
                      <option key={stream.id} value={stream.id}>
                        {stream.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {filteredQuestions.map((question) => (
                <div
                  key={question.id}
                  className="bg-gray-800 p-6 rounded-lg border border-gray-700"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-orange-500/20">
                        <span className="text-sm font-medium text-orange-500">
                          {question.id}
                        </span>
                      </span>
                    </div>
                    <div className="flex-1">
                      {editingId === question.id.toString() ? (
                        // Edit Form
                        <div className="space-y-3">
                          <textarea
                            value={editForm.text}
                            onChange={(e) =>
                              setEditForm({ ...editForm, text: e.target.value })
                            }
                            className="w-full px-3 py-2 bg-gray-700 border-gray-600 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            rows={3}
                          />
                          <input
                            type="text"
                            value={editForm.category_id}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                category_id: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 bg-gray-700 border-gray-600 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleUpdate(question.id)}
                              className="flex items-center px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
                              <FiCheck className="mr-1" /> Save
                            </button>
                            <button
                              onClick={cancelEditing}
                              className="flex items-center px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                            >
                              <FiX className="mr-1" /> Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        // Display Mode
                        <>
                          <p className="text-lg text-gray-100">
                            {question.text}
                          </p>
                          <p className="mt-2 text-sm text-gray-400">
                            Category:{" "}
                            <span className="font-medium text-gray-300">
                              {question.category?.name}
                            </span>
                          </p>
                          <div className="mt-3 flex space-x-2">
                            <button
                              onClick={() => startEditing(question)}
                              className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                              <FiEdit2 className="mr-1" />
                            </button>
                            <button
                              onClick={() => handleDelete(question.id.toString()  )}
                              className="flex items-center px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                              <FiTrash2 className="mr-1" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Custom Scrollbar Styles */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #1f2937;
        }

        ::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }

        /* Firefox */
        * {
          scrollbar-width: thin;
          scrollbar-color: #4b5563 #1f2937;
        }
      `}</style>
    </div>
  );
}

export default QuestionsPage;
