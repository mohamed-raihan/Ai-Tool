"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { authService } from "@/app/services/auth.service";
import { toast } from "react-toastify";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log(isLoggedIn);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Redirect based on user role
      if (email === "admin@gmail.com" && password === "admin") {
        // const response = await authService.login({
        //   email,
        //   password,
        // });

        // console.log(response);

        // // Store user data in localStorage
        // localStorage.setItem("user", JSON.stringify(response.user));

        toast.success("Login successful!");
        setIsLoggedIn(true);
        router.push("/admin/dashboard");
      } else {
        const response = await authService.login({ email, password });

        console.log(response);

        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(response.user));

        toast.success("Login successful!");
        setIsLoggedIn(true);
        router.push("/user/dashboard");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        toast.error(error.message);
      } else {
        setError("Login failed. Please try again.");
        toast.error("Login failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="flex bg-gray-800 rounded-lg border border-gray-700 p-5">
        {/* Left side with image */}
        <div className="hidden md:flex md:w-1/2 bg-gray-900 items-center justify-start relative overflow-hidden rounded-lg">
          <div className="relative left-0 top-0 -translate-x-[10%] scale-[1.7]">
            <Image
              src="/signUp-test.jpg"
              alt="Prepacademy Character"
              width={700}
              height={700}
              className="rounded-lg"
              priority
            />
          </div>
        </div>

        {/* Right side with login form */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-md ms-10">
            <div className="flex justify-center items-center mb-6">
              <h1 className="text-orange-500 text-2xl font-bold">
                Prepacademy.
              </h1>
            </div>

            <h2 className="text-3xl font-bold text-gray-100 mb-8">Login</h2>

            {error && (
              <div className="mb-4 p-3 bg-red-900 border border-red-700 text-red-100 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-gray-300 font-medium mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    className="pl-10 w-full px-4 py-2 bg-gray-700 border-gray-600 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="yourname@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-300 font-medium mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="pl-10 w-full px-4 py-2 bg-gray-700 border-gray-600 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-400" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-end mb-6">
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-orange-500 hover:text-orange-400"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600 transition duration-200 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log In"}
              </button>
            </form>

            <div className="text-center mt-8">
              <p className="text-gray-400">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-orange-500 hover:text-orange-400"
                >
                  Sign Up here
                </Link>
              </p>
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
