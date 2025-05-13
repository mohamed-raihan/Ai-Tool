"use client";
import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import api from "@/app/lib/axios";
import { API_URL } from "@/app/services/api_url";

interface Category {
  id: string;
  name: string;
}

interface Class {
  id: string;
  name: string;
  categoryId: string;
}

interface Stream {
  id: string;
  name: string;
  classId: string;
}

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [streams, setStreams] = useState<Stream[]>([]);
  // const [selectedClass, setSelectedClass] = useState<string>("");
  const [newCategory, setNewCategory] = useState("");
  const [newClass, setNewClass] = useState("");
  const [newStream, setNewStream] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchClasses();
    fetchStreams();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get(API_URL.ADMIN.CATEGORY);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await api.get(API_URL.ADMIN.CLASS);
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchStreams = async () => {
    try {
      const response = await api.get(API_URL.ADMIN.STREAM);
      setStreams(response.data);
    } catch (error) {
      console.error("Error fetching streams:", error);
    }
  };

  const handleAddCategory = async () => {
    try {
      const response = await api.post(API_URL.ADMIN.CATEGORY, {
        name: newCategory,
      });
      console.log(response.data);
      fetchCategories();
      setNewCategory("");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleAddClass = async () => {
    try {
      const response = await api.post(API_URL.ADMIN.CLASS, { name: newClass });
      console.log(response.data);
      fetchClasses();
      setNewClass("");
    } catch (error) {
      console.error("Error adding class:", error);
    }
  };

  const handleAddStream = async () => {
    try {
      const response = await api.post(API_URL.ADMIN.STREAM, {
        name: newStream,
      });
      console.log(response.data);
      fetchStreams();
      setNewStream("");
    } catch (error) {
      console.error("Error adding stream:", error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await api.delete(API_URL.ADMIN.DELETE_CATEGORY(id));
      console.log(response.data);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleDeleteClass = async (id: string) => {
    try {
      const response = await api.delete(API_URL.ADMIN.DELETE_CLASS(id));
      console.log(response.data);
      fetchClasses();
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  const handleDeleteStream = async (id: string) => {
    try {
      const response = await api.delete(API_URL.ADMIN.DELETE_STREAM(id));
      console.log(response.data);
      fetchStreams();
    } catch (error) {
      console.error("Error deleting stream:", error);
    }
  };
  

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8 overflow-y-auto">
      <div className="max-w-8xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-100 mb-8">
          Category Management
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Category Section */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-100 mb-4 flex items-center gap-2">
              <Plus className="text-orange-500" />
              Add Category
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter category name"
                className="w-full p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
              />
              <button
                onClick={handleAddCategory}
                className="w-full bg-orange-500 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors"
              >
                <Plus size={20} />
                Add Category
              </button>
            </div>
          </div>

          {/* Add Class Section */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-100 mb-4 flex items-center gap-2">
              <Plus className="text-orange-500" />
              Add Class
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                value={newClass}
                onChange={(e) => setNewClass(e.target.value)}
                placeholder="Enter class name"
                className="w-full p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
              />
              <button
                onClick={handleAddClass}
                className="w-full bg-orange-500 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors"
              >
                <Plus size={20} />
                Add Class
              </button>
            </div>
          </div>

          {/* Add Stream Section */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-100 mb-4 flex items-center gap-2">
              <Plus className="text-orange-500" />
              Add Stream
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                value={newStream}
                onChange={(e) => setNewStream(e.target.value)}
                placeholder="Enter stream name"
                className="w-full p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
              />
              <button
                onClick={handleAddStream}
                className="w-full bg-orange-500 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors"
              >
                <Plus size={20} />
                Add Stream
              </button>
            </div>
          </div>
        </div>

        {/* Display Data Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Categories List */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
              Categories
            </h2>
            <div
              className="space-y-3 max-h-[400px] overflow-y-auto pr-2
              [&::-webkit-scrollbar]:w-1.5 
              [&::-webkit-scrollbar-track]:bg-gray-800 
              [&::-webkit-scrollbar-thumb]:bg-gray-600 
              [&::-webkit-scrollbar-thumb]:rounded-full 
              [&::-webkit-scrollbar-thumb]:hover:bg-gray-500"
            >
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex justify-between items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <span className="text-gray-100">{category.name}</span>
                  <div className="flex gap-3">
                    <button  className="text-orange-500 hover:text-orange-400 transition-colors">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDeleteCategory(category.id)} className="text-red-500 hover:text-red-400 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Classes List */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
              Classes
            </h2>
            <div
              className="space-y-3 max-h-[400px] overflow-y-auto pr-2
              [&::-webkit-scrollbar]:w-1.5 
              [&::-webkit-scrollbar-track]:bg-gray-800 
              [&::-webkit-scrollbar-thumb]:bg-gray-600 
              [&::-webkit-scrollbar-thumb]:rounded-full 
              [&::-webkit-scrollbar-thumb]:hover:bg-gray-500"
            >
              {classes.map((cls) => (
                <div
                  key={cls.id}
                  className="flex justify-between items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <span className="text-gray-100">{cls.name}</span>
                  <div className="flex gap-3">
                    <button className="text-orange-500 hover:text-orange-400 transition-colors">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDeleteClass(cls.id)} className="text-red-500 hover:text-red-400 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Streams List */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
              Streams
            </h2>
            <div
              className="space-y-3 max-h-[400px] overflow-y-auto pr-2
              [&::-webkit-scrollbar]:w-1.5 
              [&::-webkit-scrollbar-track]:bg-gray-800 
              [&::-webkit-scrollbar-thumb]:bg-gray-600 
              [&::-webkit-scrollbar-thumb]:rounded-full 
              [&::-webkit-scrollbar-thumb]:hover:bg-gray-500"
            >
              {streams.map((stream) => (
                <div
                  key={stream.id}
                  className="flex justify-between items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <span className="text-gray-100">{stream.name}</span>
                  <div className="flex gap-3">
                    <button className="text-orange-500 hover:text-orange-400 transition-colors">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDeleteStream(stream.id)} className="text-red-500 hover:text-red-400 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
