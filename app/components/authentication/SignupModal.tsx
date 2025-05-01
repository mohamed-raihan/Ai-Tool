"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FiX, FiUser, FiPhone, FiMail, FiLock } from "react-icons/fi";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    phone_number: string;
    email: string;
    password: string;
  }) => Promise<void>;
}

export default function SignupModal({
  isOpen,
  onClose,
  onSubmit,
}: SignupModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await onSubmit(formData);
      setSuccess(true);
      setFormData({
        name: "",
        phone_number: "",
        email: "",
        password: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl w-full max-w-4xl relative border border-gray-800 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-300 bg-gray-800/50 p-2 rounded-lg transition-colors"
        >
          <FiX size={20} />
        </button>

        {success ? (
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-500"
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
            </div>
            <h3 className="text-2xl font-bold text-gray-100 mb-3">
              Signup Successful!
            </h3>
            <p className="text-gray-400 mb-6">
              Your account has been created. You'll be redirected to your
              results shortly.
            </p>
            <div className="w-16 h-1 bg-green-500/30 mx-auto rounded-full mb-6"></div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-200 transform hover:scale-105"
            >
              Continue
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Section - Image */}
            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>
              <Image
                src="/signUp-test.jpg"
                alt="Signup illustration"
                width={500}
                height={600}
                className="w-full h-full object-cover rounded-l-2xl"
              />
            </div>

            {/* Right Section - Form */}
            <div className="p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
                  Complete Your Profile
                </h2>
                <p className="text-gray-400 mt-2">
                  Sign up to view your personalized career assessment results
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-4">
                  {/* Name Input */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-colors"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone_number"
                      name="phone_number"
                      placeholder="Phone Number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-colors"
                    />
                  </div>

                  {/* Password Input */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Create Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-colors"
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-sm text-red-400 flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {error}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
                      Creating Account...
                    </div>
                  ) : (
                    "Complete Signup"
                  )}
                </button>

                <p className="text-sm text-gray-400 text-center mt-4">
                  By signing up, you agree to our{" "}
                  <a href="#" className="text-orange-500 hover:text-orange-400">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-orange-500 hover:text-orange-400">
                    Privacy Policy
                  </a>
                </p>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
