"use client";

import api from "@/app/lib/axios";
import { API_URL } from "@/app/services/api_url";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FiX, FiUser, FiPhone, FiMail } from "react-icons/fi";
import {
  initializeRecaptcha,
  sendOTP,
  verifyOTP,
} from "../firebase/firebaseApp";
import { toast } from "react-toastify";
import { setAuth } from "@/app/lib/auth";

interface Stream {
  id: string;
  name: string;
  class_id: string;
}

interface Class {
  id: string;
  name: string;
}

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
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
  }) => Promise<void>;
}

export default function SignupModal({
  isOpen,
  onClose,
}: SignupModalProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    gender: "Male",
    dob: "",
    address: "address",
    role: "student",
    class_id: "",
    stream_id: "",
    firebase_user_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [classes, setClasses] = useState([]);
  // const [streams, setStreams] = useState([]);
  const [filteredStreams, setFilteredStreams] = useState([]);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  useEffect(() => {
    fetchClasses();
  }, []);

  console.log(isVerifying);
  

  const fetchClasses = async () => {
    try {
      const response = await api.get(API_URL.STUDYING.GET_CLASSES);
      console.log(response.data);
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchStreams = async (classId: string) => {
    try {
      const response = await api.get(API_URL.STUDYING.GET_STREAMS);
      console.log(response.data);
      // Filter streams by class_id
      const filtered = response.data.filter(
        (stream: Stream) => stream.class_id == classId
      );
      console.log(filtered);
      // setStreams(response.data);
      setFilteredStreams(filtered);
    } catch (error) {
      console.error("Error fetching streams:", error);
    }
  };

  //firebase auth
  const handleSendOTP = async () => {
    if (!formData.phone) {
      setError("Please enter a mobile number");
      return;
    }

    const firebaseRes = await api.post(API_URL.FIREBASE.PHONE_NUMBER, {
      phone_number: formData.phone.startsWith("+91")
        ? formData.phone
        : `+91${formData.phone.replace(/^0+/, "")}`,
    });
    setFormData((prev) => ({
      ...prev,
      firebase_user_id: firebaseRes.data.uid,
    }));

    const mobilePattern = /^(\+91|91)?[6-9]\d{9}$/;
    let mobileToCheck = formData.phone;

    if (mobileToCheck.startsWith("+91")) {
      mobileToCheck = mobileToCheck.substring(3);
    } else if (mobileToCheck.startsWith("91")) {
      mobileToCheck = mobileToCheck.substring(2);
    }

    if (
      !mobilePattern.test("+91" + mobileToCheck.replace(/\D/g, "").slice(-10))
    ) {
      setError("Please enter a valid Indian mobile number");
      return;
    }

    setIsVerifying(true);
    setError(null);
    setSendingOtp(true);

    try {
      // Initialize reCAPTCHA
      await initializeRecaptcha("recaptcha-container");

      // Format phone number properly
      const phoneNumber = formData.phone.startsWith("+91")
        ? formData.phone
        : `+91${formData.phone.replace(/^0+/, "")}`;

      // Send OTP via Firebase
      const result = await sendOTP(phoneNumber);

      if (result.success) {
        setOtpSent(true);
        toast.success("OTP sent successfully to your mobile!");
      } else {
        setError(result.error || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError("Failed to send OTP. Please try again.");
    } finally {
      setIsVerifying(false);
      setSendingOtp(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length < 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setIsVerifying(true);
      setError(null);
      setVerifyingOtp(true);

      // Verify OTP with Firebase
      const result = await verifyOTP(otp);
      console.log(result);

      if (result.success) {
        setPhoneVerified(true);

        // Store the Firebase user ID directly in formData
        if (result.user?.uid) {
          setFormData((prev) => ({
            ...prev,
            firebase_user_id: result.user?.uid || "",
          }));
        }

        console.log("Phone number verified successfully!");
      } else {
        setError(result.error || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("Verification failed. Please try again.");
    } finally {
      setIsVerifying(false);
      setVerifyingOtp(false);
    }
  };

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "class_id") {
      await fetchStreams(value);
      setFormData((prev) => ({ ...prev, stream_id: "" })); // Reset stream_id
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneVerified) {
      setError("Please verify your phone number first");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      // Call firebase API
      // const firebaseRes = await api.post(API_URL.FIREBASE.PHONE_NUMBER, {
      //   phone_number: formData.phone.startsWith("+91")
      //     ? formData.phone
      //     : `+91${formData.phone.replace(/^0+/, "")}`,
      // });
      // console.log(firebaseRes);

      // Add firebase_user_id to formData
      const studentData = {
        ...formData,
        firebase_user_id: formData.firebase_user_id,
      };

      // Call student API with updated data
      const studentRes = await api.post(API_URL.STUDENT.BASIC, studentData);
      console.log(studentRes);
      // Store student details in sessionStorage
      if (
        studentRes.data &&
        studentRes.data.student_uuid &&
        studentRes.data.name &&
        studentRes.data.email
      ) {
        sessionStorage.setItem(
          "student",
          JSON.stringify({
            student_uuid: studentRes.data.student_uuid,
            name: studentRes.data.name,
            email: studentRes.data.email,
            phone: studentRes.data.phone,
          })
        );
      }
      setSuccess(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        password: "",
        gender: "Male",
        dob: "",
        address: "",
        role: "student",
        class_id: "",
        stream_id: "",
        firebase_user_id: "",
      });
      setAuth();
      router.push("/user/dashboard/instructions");
    } catch (err) {
      console.log(err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
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
              Your account has been created. You&apos;ll be redirected to your
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
          <div className="grid md:grid-cols-2 h-full gap-0">
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

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info Row */}
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Gender Dropdown */}
                  <div className="relative">
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className="w-full pl-3 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-colors"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  {/* DOB Input */}
                  <div className="relative">
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                      className="w-full pl-3 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Class ID Select */}
                  <div className="relative">
                    <select
                      id="class_id"
                      name="class_id"
                      value={formData.class_id}
                      onChange={handleChange}
                      required
                      className="w-full pl-3 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-colors"
                    >
                      <option value="">Select Class</option>
                      {classes.map((cls: Class) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Stream ID Select */}
                  <div className="relative">
                    <select
                      id="stream_id"
                      name="stream_id"
                      value={formData.stream_id}
                      onChange={handleChange}
                      required
                      className="w-full pl-3 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-colors"
                    >
                      <option value="">Select Stream</option>
                      {filteredStreams.map((stream: Stream) => (
                        <option key={stream.id} value={stream.id}>
                          {stream.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Address Input */}
                <div className="relative">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full pl-3 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-colors"
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

                {/* Contact Info Row */}
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  {/* Phone Input with OTP */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        disabled={otpSent}
                        className={`w-full ${
                          !otpSent && !phoneVerified
                            ? "col-span-2"
                            : "col-span-3"
                        } pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-colors`}
                      />
                      {!otpSent && !phoneVerified && (
                        <button
                          type="button"
                          onClick={handleSendOTP}
                          disabled={sendingOtp}
                          className="px-4 py-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed col-span-1"
                        >
                          {sendingOtp ? "Sending..." : "Send OTP"}
                        </button>
                      )}
                    </div>
                  </div>
                  {/* OTP Input */}
                  {otpSent && !phoneVerified && (
                    <div className="relative">
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          placeholder="Enter OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className="w-full col-span-2 pl-3 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-colors"
                        />
                        <button
                          type="button"
                          onClick={handleVerifyOTP}
                          disabled={verifyingOtp}
                          className="px-4 py-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed col-span-1"
                        >
                          {verifyingOtp ? "Verifying..." : "Verify OTP"}
                        </button>
                      </div>
                    </div>
                  )}
                  {/* Phone Verification Status */}
                  {phoneVerified && (
                    <div className="p-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="text-sm text-green-400 flex items-center">
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
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Phone number verified
                      </p>
                    </div>
                  )}
                </div>
                {/* Password Row */}
                {/* <div className="relative">
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
                </div> */}

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
              </form>
            </div>
          </div>
        )}
      </div>
      <div id="recaptcha-container" className="hidden"></div>
    </div>
  );
}
