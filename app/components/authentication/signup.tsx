"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { authService } from "@/app/services/auth.service";
import { studentService } from "../../services/student.service";
import { log } from "console";
import { toast } from "react-toastify";
import api from "@/app/lib/axios";
import { API_URL } from "@/app/services/api_url";

type FormStep = "basic" | "education" | "personal" | "family" | "other";

interface FormData {
  basic: {
    name: string;
    phone: string;
    email: string;
    gender: string;
    dob: string;
    address: string;
    password: string;
    role: string;
    class_id: string;
    stream_id: string;
  };
  personal: {
    hobbies: string;
    curicular_activities: string;
    achievements: string;
    internship_projects: string;
    languages_known: string;
  };
  education: {
    studying_in: string;
    specification: string;
    college: string;
    course: string;
    passing_year: string;
    university: string;
    planning_to_study: boolean;
    preparing_for_entrance_exam: boolean;
  };
  family: {
    father_name: string;
    father_occupation: string;
    mother_name: string;
    mother_occupation: string;
    siblings: string;
  };
  other: {
    password: string;
    confirmPassword: string;
  };
}

interface ClassItem {
  id: number;
  name: string;
  streams: Stream[];
}

interface Stream {
  id: number;
  name: string;
}

export default function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<FormStep>("basic");
  const [accessToken, setAccessToken] = useState<string>("");
  const [studentId, setStudentId] = useState<number | null>(null);
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [streams, setStreams] = useState<Stream[]>([]);
  const [formData, setFormData] = useState<FormData>({
    basic: {
      name: "",
      phone: "",
      email: "",
      gender: "Male",
      dob: "",
      address: "",
      password: "",
      role: "student",
      class_id: "",
      stream_id: "",
    },
    personal: {
      hobbies: "",
      curicular_activities: "",
      achievements: "",
      internship_projects: "",
      languages_known: "",
    },
    education: {
      studying_in: "",
      specification: "",
      college: "",
      course: "",
      passing_year: "",
      university: "",
      planning_to_study: false,
      preparing_for_entrance_exam: false,
    },
    family: {
      father_name: "",
      father_occupation: "",
      mother_name: "",
      mother_occupation: "",
      siblings: "",
    },
    other: {
      password: "",
      confirmPassword: "",
    },
  });

  const fetchClasses = async () => {
    try {
      const response = await api.get(API_URL.STUDYING.GET_CLASSES);
      console.log(response.data);
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  // const fetchStreams = async () => {
  //     try {
  //         const response = await api.get(API_URL.STUDYING.GET_STREAMS);
  //         console.log(response.data);
  //         setStreams(response.data);
  //     } catch (error) {
  //         console.error('Error fetching streams:', error);
  //     }
  // };

  const handleInputChange = (
    section: keyof FormData,
    field: string,
    value: string | boolean
  ) => {
    console.log(field);

    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));

    if (field === "class_id") {
      const selectedClass = classes.find(
        (c) => c.id === parseInt(value as string)
      );
      console.log(selectedClass);
      if (selectedClass) {
        setStreams(selectedClass.streams);
      }
    }
  };

  const validateForm = () => {
    if (!formData.basic.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!formData.basic.phone.trim()) {
      setError("Phone number is required");
      return false;
    }
    if (!formData.basic.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!formData.basic.password) {
      setError("Password is required");
      return false;
    }
    if (formData.basic.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Handle basic details validation and move to next step
      if (currentStep === "basic") {
        if (!validateForm()) {
          setIsLoading(false);
          return;
        }
        setCurrentStep("personal");
      }
      // Move to education step
      else if (currentStep === "personal") {
        setCurrentStep("education");
      }
      // Submit all data
      else if (currentStep === "education") {
        // First register and get student profile
        console.log(formData.basic);
        const basicResponse = await studentService.updateBasicDetails(
          formData.basic
        );
        setAccessToken(basicResponse.accessToken);

        // Get student ID from the response
        const studentId = basicResponse.data.id;

        // Submit personal details
        await studentService.updatePersonalDetails(
          formData.personal,
          studentId
        );

        // Submit education details
        await studentService.updateEducationDetails(
          formData.education,
          studentId
        );

        // Store student name in localStorage
        localStorage.setItem("studentName", formData.basic.name);

        toast.success("Registration completed successfully!");
        router.push("/user/dashboard/instructions");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to save details. Please try again.");
      toast.error("Failed to save details");
    } finally {
      setIsLoading(false);
    }
  };

  console.log(streams);

  useEffect(() => {
    fetchClasses();
    // fetchStreams();
  }, []);

  const renderBasicSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Full Name
          </label>
          <input
            type="text"
            value={formData.basic.name}
            onChange={(e) => handleInputChange("basic", "name", e.target.value)}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-500 focus:ring-orange-500 p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Phone
          </label>
          <input
            type="tel"
            value={formData.basic.phone}
            onChange={(e) =>
              handleInputChange("basic", "phone", e.target.value)
            }
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-500 focus:ring-orange-500 p-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            type="email"
            value={formData.basic.email}
            onChange={(e) =>
              handleInputChange("basic", "email", e.target.value)
            }
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-500 focus:ring-orange-500 p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={formData.basic.password}
              onChange={(e) =>
                handleInputChange("basic", "password", e.target.value)
              }
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-500 focus:ring-orange-500 p-2"
              minLength={6}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="h-5 w-5 text-gray-400" />
              ) : (
                <FaEye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Gender
          </label>
          <div className="mt-1 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.basic.gender === "Male"}
                onChange={(e) =>
                  handleInputChange("basic", "gender", e.target.value)
                }
                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-600 rounded"
              />
              <span className="ml-2 text-gray-300">Male</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.basic.gender === "Female"}
                onChange={(e) =>
                  handleInputChange("basic", "gender", e.target.value)
                }
                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-600 rounded"
              />
              <span className="ml-2 text-gray-300">Female</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={formData.basic.gender === "Other"}
                onChange={(e) =>
                  handleInputChange("basic", "gender", e.target.value)
                }
                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-600 rounded"
              />
              <span className="ml-2 text-gray-300">Other</span>
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Date of Birth
          </label>
          <input
            type="date"
            value={formData.basic.dob}
            onChange={(e) => handleInputChange("basic", "dob", e.target.value)}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-500 focus:ring-orange-500 p-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Class
          </label>
          <select
            value={formData.basic.class_id}
            onChange={(e) =>
              handleInputChange("basic", "class_id", e.target.value)
            }
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-500 focus:ring-orange-500 p-2"
          >
            <option value="">Select Class</option>
            {classes.map((classItem) => (
              <option key={classItem.id} value={classItem.id}>
                {classItem.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Stream
          </label>
          <select
            value={formData.basic.stream_id}
            onChange={(e) =>
              handleInputChange("basic", "stream_id", e.target.value)
            }
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-500 focus:ring-orange-500 p-2"
          >
            <option value="">Select Stream</option>
            {streams.map((stream) => (
              <option key={stream.id} value={stream.id}>
                {stream.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">
          Address
        </label>
        <textarea
          value={formData.basic.address}
          onChange={(e) =>
            handleInputChange("basic", "address", e.target.value)
          }
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-500 focus:ring-orange-500 p-2"
          rows={3}
        />
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          {isLoading ? "Saving..." : "Save & Continue"}
        </button>
      </div>
    </div>
  );

  const renderPersonalSection = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300">
          Hobbies
        </label>
        <textarea
          value={formData.personal.hobbies}
          onChange={(e) =>
            handleInputChange("personal", "hobbies", e.target.value)
          }
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-500 focus:ring-orange-500 p-2"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">
          Curricular Activities
        </label>
        <textarea
          value={formData.personal.curicular_activities}
          onChange={(e) =>
            handleInputChange(
              "personal",
              "curicular_activities",
              e.target.value
            )
          }
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-500 focus:ring-orange-500 p-2"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">
          Achievements
        </label>
        <textarea
          value={formData.personal.achievements}
          onChange={(e) =>
            handleInputChange("personal", "achievements", e.target.value)
          }
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-500 focus:ring-orange-500 p-2"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">
          Internship Projects
        </label>
        <textarea
          value={formData.personal.internship_projects}
          onChange={(e) =>
            handleInputChange("personal", "internship_projects", e.target.value)
          }
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-500 focus:ring-orange-500 p-2"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">
          Languages Known
        </label>
        <textarea
          value={formData.personal.languages_known}
          onChange={(e) =>
            handleInputChange("personal", "languages_known", e.target.value)
          }
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-500 focus:ring-orange-500 p-2"
          rows={3}
        />
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={() => setCurrentStep("basic")}
          className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
        >
          {isLoading ? "Saving..." : "Save & Continue"}
        </button>
      </div>
    </div>
  );

  const renderEducationSection = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300">
          Studying In
        </label>
        <input
          type="text"
          value={formData.education.studying_in}
          onChange={(e) =>
            handleInputChange("education", "studying_in", e.target.value)
          }
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-500 focus:ring-orange-500 p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">
          Stream
        </label>
        <input
          type="text"
          value={formData.education.specification}
          onChange={(e) =>
            handleInputChange("education", "specification", e.target.value)
          }
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-500 focus:ring-orange-500 p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">
          School/College
        </label>
        <input
          type="text"
          value={formData.education.college}
          onChange={(e) =>
            handleInputChange("education", "college", e.target.value)
          }
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-500 focus:ring-orange-500 p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">
          Course
        </label>
        <input
          type="text"
          value={formData.education.course}
          onChange={(e) =>
            handleInputChange("education", "course", e.target.value)
          }
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-500 focus:ring-orange-500 p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">
          Passing Year
        </label>
        <input
          type="text"
          value={formData.education.passing_year}
          onChange={(e) =>
            handleInputChange("education", "passing_year", e.target.value)
          }
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-500 focus:ring-orange-500 p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">
          University
        </label>
        <input
          type="text"
          value={formData.education.university}
          onChange={(e) =>
            handleInputChange("education", "university", e.target.value)
          }
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-500 focus:ring-orange-500 p-2"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={formData.education.planning_to_study}
          onChange={(e) =>
            handleInputChange(
              "education",
              "planning_to_study",
              e.target.checked
            )
          }
          className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-600 rounded"
        />
        <label className="ml-2 block text-sm text-gray-300">
          Planning to Study
        </label>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={formData.education.preparing_for_entrance_exam}
          onChange={(e) =>
            handleInputChange(
              "education",
              "preparing_for_entrance_exam",
              e.target.checked
            )
          }
          className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-600 rounded"
        />
        <label className="ml-2 block text-sm text-gray-300">
          Preparing for Entrance Exam
        </label>
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={() => setCurrentStep("personal")}
          className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (currentStep) {
      case "basic":
        return renderBasicSection();
      case "personal":
        return renderPersonalSection();
      case "education":
        return renderEducationSection();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900  sm:pe-6 lg:pe-8">
      <div className="mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          {/* left side - Image */}
          <div className="lg:w-1/2 h-screen overflow-hidden relative">
            <div className="absolute inset-0">
              {/* Glow effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-orange-600/20 via-transparent to-transparent blur-2xl transform scale-110 opacity-95"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"></div>
              {/* Right side blend gradient */}
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>

              {/* Main image */}
              <Image
                src="/signUp-test.jpg"
                alt="Test Illustration"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right side - Form */}
          <div className="w-full lg:w-3/4">
            <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden h-[84vh] border border-gray-700">
              <div className="flex flex-col h-full">
                {/* Top navigation */}
                <div className="bg-gray-900 p-4">
                  <nav className="flex justify-center space-x-4">
                    <button
                      onClick={() => setCurrentStep("basic")}
                      className={`px-6 py-2 rounded-md transition-colors ${
                        currentStep === "basic"
                          ? "bg-orange-500 text-white font-medium"
                          : "text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      Basic
                    </button>
                    <button
                      onClick={() => setCurrentStep("personal")}
                      className={`px-6 py-2 rounded-md transition-colors ${
                        currentStep === "personal"
                          ? "bg-orange-500 text-white font-medium"
                          : "text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      Personal
                    </button>
                    <button
                      onClick={() => setCurrentStep("education")}
                      className={`px-6 py-2 rounded-md transition-colors ${
                        currentStep === "education"
                          ? "bg-orange-500 text-white font-medium"
                          : "text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      Education
                    </button>
                  </nav>
                </div>

                {/* Main content area */}
                <div className="flex-1 overflow-y-auto p-6">
                  {error && (
                    <div className="mb-4 p-3 bg-red-900 border border-red-700 text-red-100 rounded">
                      {error}
                    </div>
                  )}
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-100">
                      {currentStep.charAt(0).toUpperCase() +
                        currentStep.slice(1)}{" "}
                      Information
                    </h2>
                    <div className="space-y-4">
                      {/* Form inputs styling */}
                      <style jsx>{`
                        input[type="text"],
                        input[type="tel"],
                        input[type="email"],
                        input[type="password"],
                        input[type="date"],
                        select,
                        textarea {
                          @apply bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-500 focus:ring-orange-500;
                        }
                        input[type="radio"],
                        input[type="checkbox"] {
                          @apply text-orange-500 border-gray-600 focus:ring-orange-500;
                        }
                        label {
                          @apply text-gray-300;
                        }
                        .form-label {
                          @apply text-gray-300;
                        }
                      `}</style>
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
                      {renderSection()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/"
                  className="font-medium text-orange-500 hover:text-orange-400"
                >
                  Log in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
