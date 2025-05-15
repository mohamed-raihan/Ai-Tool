"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Script from "next/script"; // ✅ Add this
import { API_URL } from "../services/api_url";
import api from "../lib/axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// Add this interface at the top of the file, after the imports
interface RazorpayWindow extends Window {
  Razorpay: {
    new (options: RazorpayOptions): RazorpayInstance;
  };
}

interface RazorpayInstance {
  open: () => void;
  close: () => void;
  on: (event: string, handler: (response: RazorpayResponse) => void) => void;
}

// Add these interfaces after the RazorpayWindow interface
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact?: string;
  };
  theme: {
    color: string;
    backdrop_color?: string;
    hide_topbar?: boolean;
  };
  modal?: {
    ondismiss?: () => void;
    escape?: boolean;
    backdropclose?: boolean;
  };
  config?: {
    display: {
      blocks?: {
        banks?: {
          name: string;
          instruments: Array<{
            method: string;
          }>;
        };
      };
      sequence?: string[];
      preferences?: {
        show_default_blocks?: boolean;
      };
    };
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

const PaymentPage = () => {
  const [form, setForm] = useState({
    email: "",
    name: "",
    terms_conditions: false,
  });
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState<{
    student_uuid: string;
    name: string;
    email: string;
    phone: string;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem("student");
    if (stored) {
      setStudent(JSON.parse(stored));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" && e.target instanceof HTMLInputElement
          ? e.target.checked
          : value,
    }));
  };

  const handlePayment = async () => {
    if (!student) {
      alert("Student details not found");
      return;
    }

    // ✅ Ensure Razorpay SDK is loaded
    if (
      typeof window === "undefined" ||
      !(window as unknown as RazorpayWindow).Razorpay
    ) {
      alert("Razorpay SDK not loaded. Please refresh and try again.");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post(API_URL.PAYMENT.CREATE_ORDER, {
        student_uuid: student.student_uuid,
        name: student.name,
        phone_number: student.phone,
        term_condition: true,
      });

      const order = res.data;
      console.log(order);

      const options: RazorpayOptions = {
        key: order.razorpay_key || process.env.RAZORPAY_KEY_ID || "",
        amount: order.amount * 100, // ensure amount is in paisa
        currency: "INR",
        name: "Prepacademy",
        description: "Premium Personality Report",
        order_id: order.order_id,
        handler: async function (response: RazorpayResponse) {
          console.log(response);
          await api.post(API_URL.PAYMENT.VERIFY_ORDER, {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });

          // On success: set subscription flag and redirect
          sessionStorage.setItem("hasSubscription", "true");
          toast.success("Payment successful");
          await api.patch(API_URL.STUDENT.UPDATE_BASIC(student.student_uuid), {
            is_subscribed: true,
          });
          router.push("/user/dashboard/test/results");
        },
        prefill: {
          name: student.name,
          email: student.email,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new (window as unknown as RazorpayWindow).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col md:flex-row items-center justify-center py-10 px-2 md:px-0">
      {/* ✅ Razorpay Script */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      {/* Left: Summary */}
      <div className="w-full md:w-1/2 max-w-lg bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 md:mb-0 md:mr-8 border border-gray-700 flex flex-col justify-between">
        <div>
          <div className="relative flex items-center mb-8">
            <Image
              src="/prepMascot.png"
              alt="Premium"
              width={90}
              height={90}
              className="scale-125"
            />
            <span className="text-3xl font-bold text-white ml-2 absolute bottom-0 left-18">
              Prepacademy
            </span>
          </div>
          <div className="text-gray-300 mb-2">
            Pay <span className="font-semibold text-white">Prepacademy</span>
          </div>
          <div className="text-3xl font-bold text-orange-400 mb-8">
            ₹1999.00
          </div>
          <div className="flex items-center mb-4">
            <div>
              <div className="text-white font-semibold">
                Premium Personality Report
              </div>
              <div className="text-gray-400 me-2 text-sm">
                Discover many additional aspects of your personality such as
                Career recommendation, resilience, and emotional intelligence.
              </div>
            </div>
            <div className="ml-auto text-white font-semibold">₹1999.00</div>
          </div>
          <div className="border-t border-gray-700 my-4"></div>
          <div className="flex justify-between text-gray-400 mb-2">
            <span>Subtotal</span>
            <span>₹1999.00</span>
          </div>
          <div className="flex justify-between text-gray-400 mb-2">
            <span>
              Tax{" "}
              <span className="text-xs" title="Enter address to calculate">
                ⓘ
              </span>
            </span>
            <span className="text-gray-500">Enter address to calculate</span>
          </div>
          <div className="border-t border-gray-700 my-4"></div>
          <div className="flex justify-between text-lg font-bold text-white">
            <span>Total due</span>
            <span>₹1999.00</span>
          </div>
          <div className="my-4 flex items-center">
            <input
              type="checkbox"
              name="terms_conditions"
              checked={form.terms_conditions}
              onChange={handleChange}
              className="mr-2 accent-orange-500"
            />
            <span className="text-gray-400 text-sm">
              I agree to the{" "}
              <a
                href="/terms-conditions"
                className="text-orange-500 hover:text-orange-600"
              >
                Terms & Conditions
              </a>
            </span>
          </div>
          <button
            onClick={handlePayment}
            className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium text-lg transition duration-200 disabled:opacity-50 flex items-center justify-center"
            disabled={loading || !form.terms_conditions}
          >
            {loading ? (
              <span className="flex items-center">
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                Processing...
              </span>
            ) : (
              "Pay"
            )}
          </button>
        </div>
        <div className="mt-8 text-xs text-gray-500 text-center">
          Powered by <span className="font-semibold text-white">Razorpay</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
