"use client";
import React, { useState } from "react";
import {
  FiBarChart2,
  FiUser,
  FiTarget,
  FiAward,
  FiClock,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import SignupModal from "../components/authentication/SignupModal";
// import SignupModal from "@/components/SignupModal";

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleModalSubmit = async (data: {
    name: string;
    phone: string;
    email: string;
    password: string;
    gender: string;
    dob: string;
    address: string;
    role: string;
    class_id: string;
    stream_id: string;
  }) => {
    try {
      // Here you would typically make an API call to register the user
      console.log("Signup data:", data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // After successful signup, navigate to results
      router.push("/user/dashboard/instructions");
    } catch (error) {
      throw new Error("Failed to sign up. Please try again.");
    }
  };

  const handleTest = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Discover Your True Potential
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Only 10 minutes to get a "freakishly accurate" description of who
              you are and why you do things the way you do.
            </p>
            <button
              onClick={handleTest}
              className="inline-block px-8 py-4 bg-orange-500 text-white text-lg font-semibold rounded-md hover:bg-orange-600 transition-colors duration-300"
            >
              Take the Test
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-orange-500 mb-2">
                75K+
              </div>
              <div className="text-gray-400">Tests taken today</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-orange-500 mb-2">
                14M+
              </div>
              <div className="text-gray-400">Tests taken in India</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-orange-500 mb-2">
                1386M+
              </div>
              <div className="text-gray-400">Total tests taken</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-orange-500 mb-2">
                91.2%
              </div>
              <div className="text-gray-400">Accuracy rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Take Our Psychometric Test?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our scientifically validated assessment helps you understand your
              personality traits, strengths, and career potential.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
              <div className="text-orange-500 mb-4">
                <FiUser className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Self-Discovery
              </h3>
              <p className="text-gray-400">
                Gain deep insights into your personality type, strengths, and
                areas for growth through our comprehensive assessment.
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
              <div className="text-orange-500 mb-4">
                <FiTarget className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Career Guidance
              </h3>
              <p className="text-gray-400">
                Get personalized career recommendations based on your
                personality traits and natural inclinations.
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
              <div className="text-orange-500 mb-4">
                <FiBarChart2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Detailed Analysis
              </h3>
              <p className="text-gray-400">
                Receive a comprehensive report with actionable insights about
                your personality dimensions and traits.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Complete our scientifically designed assessment in just a few
              simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiClock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                10-Minute Test
              </h3>
              <p className="text-gray-400">
                Complete our quick and engaging personality assessment
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiBarChart2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Instant Results
              </h3>
              <p className="text-gray-400">
                Get your detailed personality profile immediately
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAward className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Career Matches
              </h3>
              <p className="text-gray-400">
                Discover careers that align with your personality
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Discover Your True Potential?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join millions of others who have found their path through our
            psychometric assessment.
          </p>
          <button
            onClick={handleTest}
            className="inline-block px-8 py-4 bg-orange-500 text-white text-lg font-semibold rounded-md hover:bg-orange-600 transition-colors duration-300"
          >
            Take the Test Now
          </button>
        </div>
      </div>
      <SignupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default LandingPage;
