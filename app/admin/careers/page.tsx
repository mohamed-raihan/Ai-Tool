"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { careerService, Career } from "@/app/services/careers.service";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import api from "@/app/lib/axios";
import { API_URL } from "@/app/services/api_url";

const defaultCareer: Career = {
  name: "",
  description: "",
  education_pathway: [],
  category: "",
  traits: [],
};

interface Category {
  id: number;
  name: string;
}

export default function CareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [formData, setFormData] = useState<Career>(defaultCareer);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCareers();
    fetchCategory();
  }, []);

  const fetchCareers = async () => {
    try {
      const data = await careerService.getCareers();
      setCareers(data);
    } catch (error) {
      toast.error("Failed to fetch careers");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await api.get(API_URL.ADMIN.CATEGORY);
      setCategories(response.data);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedCareer?.id) {
        await careerService.updateCareer(selectedCareer.id, formData);
        toast.success("Career updated successfully");
      } else {
        const data = await careerService.createCareer(formData);
        toast.success("Career added successfully");
        console.log("career added successfully");
        console.log(data);
      }
      fetchCareers();
      resetForm();
    } catch (error) {
      toast.error("Failed to save career");
    }
  };

  const handleEdit = (career: Career) => {
    setSelectedCareer(career);
    setFormData(career);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this career?")) {
      try {
        await careerService.deleteCareer(id);
        toast.success("Career deleted successfully");
        fetchCareers();
      } catch (error) {
        toast.error("Failed to delete career");
      }
    }
  };

  const resetForm = () => {
    setSelectedCareer(null);
    setFormData(defaultCareer);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8 overflow-y-auto ">
      <div className="max-w-8xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-100 mb-8">
          Manage Careers
        </h1>

        <div className="grid grid-cols-3 gap-4">
          {/* Add/Edit Form */}
          <div className="bg-gray-800 h-fit col-span-2 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
              {selectedCareer ? "Edit Career" : "Add New Career"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-md p-2 focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-md p-2 focus:outline-none focus:border-orange-500 h-32"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">
                  Education Pathways (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.education_pathway}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      education_pathway: e.target.value.split(","),
                    })
                  }
                  className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-md p-2 focus:outline-none focus:border-orange-500"
                  placeholder="e.g. Bachelor in Computer Science, Masters in IT"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Category ID</label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-md p-2 focus:outline-none focus:border-orange-500"
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
              <div>
                <label className="block text-gray-300 mb-2">Traits</label>
                <input
                  type="text"
                  placeholder="e.g. Analytical, Creative, etc."
                  value={formData.traits}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      traits: e.target.value.split(","),
                    })
                  }
                  className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-md p-2 focus:outline-none focus:border-orange-500"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
                >
                  {selectedCareer ? "Update Career" : "Add Career"}
                </button>
                {selectedCareer && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Careers List */}
          <div className="bg-gray-800 h-fit col-span-1 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
              Careers List
            </h2>
            <div
              className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 
              [&::-webkit-scrollbar]:w-1.5 
              [&::-webkit-scrollbar-track]:bg-gray-800 
              [&::-webkit-scrollbar-thumb]:bg-gray-600 
              [&::-webkit-scrollbar-thumb]:rounded-full 
              [&::-webkit-scrollbar-thumb]:hover:bg-gray-500
              scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600"
            >
              {careers.map((career) => (
                <div
                  key={career.id}
                  className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium text-gray-100">
                      {career.name}
                    </h3>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEdit(career)}
                        className="text-orange-500 text-xl hover:text-orange-400"
                      >
                        <FaPencilAlt />
                      </button>
                      <button
                        onClick={() => career.id && handleDelete(career.id)}
                        className="text-red-500 text-xl hover:text-red-400"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">
                    {career.description.length > 100
                      ? `${career.description.substring(0, 100)}...`
                      : career.description}
                  </p>
                  <div className="text-sm text-gray-400">
                    {/* <div className="mb-1">
                      <span className="font-medium">Category:</span>{" "}
                      <span className="text-orange-400">{career.category}</span>
                    </div> */}
                    <div className="flex gap-1">
                      <span className="font-medium mt-2">Education:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {career.education_pathway.map((path, index) => (
                          <span
                            key={index}
                            className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs"
                          >
                            {path.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-1 mt-2">
                      <span className="font-medium mt-1">Traits:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {career.traits?.map((trait, index) => (
                          <span
                            key={index}
                            className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs"
                          >
                            {trait.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
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
