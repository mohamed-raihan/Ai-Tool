"use client";
import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import api from "@/app/lib/axios";
import { API_URL } from "@/app/services/api_url";

interface Payment {
  id: string;
  amount: number;
  gst_percentage: number;
  total_amount: number;
  created_at: string;
}

export default function PaymentManagement() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [amount, setAmount] = useState<string>("");
  const [gstPercentage, setGstPercentage] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // Calculate total amount when amount or GST percentage changes
  useEffect(() => {
    if (amount && gstPercentage) {
      const amountValue = parseFloat(amount);
      const gstValue = parseFloat(gstPercentage);
      const gstAmount = (amountValue * gstValue) / 100;
      setTotalAmount(amountValue + gstAmount);
    } else {
      setTotalAmount(0);
    }
  }, [amount, gstPercentage]);

  // Load initial data
  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await api.get(API_URL.ADMIN.PAYMENT);
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPayment = async () => {
    if (amount && gstPercentage) {
      try {
        const paymentData = {
          amount: parseFloat(amount),
          gst_percentage: parseFloat(gstPercentage),
          total_amount: totalAmount,
        };
        const response = await api.post(API_URL.ADMIN.PAYMENT, paymentData);
        console.log(response.data);
        fetchPayments();
        setAmount("");
        setGstPercentage("");
        setTotalAmount(0);
      } catch (error) {
        console.error("Error adding payment:", error);
      }
    }
  };

  const deletePayment = async (id: string) => {
    try {
      const response = await api.delete(API_URL.ADMIN.DELETE_PAYMENT(id));
      console.log(response.data);
      fetchPayments();
    } catch (error) {
      console.error("Error deleting payment:", error);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
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
          Payment Management
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Payment Section */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-100 mb-4 flex items-center gap-2">
              <Plus className="text-orange-500" />
              Add Payment
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-gray-300">Amount (₹)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-300">
                  GST Percentage (%)
                </label>
                <input
                  type="number"
                  value={gstPercentage}
                  onChange={(e) => setGstPercentage(e.target.value)}
                  placeholder="Enter GST percentage"
                  className="w-full p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-300">Total Amount</label>
                <div className="w-full p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg">
                  {formatCurrency(totalAmount)}
                </div>
              </div>

              <button
                onClick={handleAddPayment}
                className="w-full bg-orange-500 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors"
              >
                <Plus size={20} />
                Add Payment
              </button>
            </div>
          </div>

          {/* Payment History Section */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
              Payment History
            </h2>
            <div
              className="space-y-4 max-h-[600px] overflow-y-auto pr-2
              [&::-webkit-scrollbar]:w-1.5 
              [&::-webkit-scrollbar-track]:bg-gray-800 
              [&::-webkit-scrollbar-thumb]:bg-gray-600 
              [&::-webkit-scrollbar-thumb]:rounded-full 
              [&::-webkit-scrollbar-thumb]:hover:bg-gray-500"
            >
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="space-y-1">
                      <div className="text-lg font-medium text-gray-100">
                        {formatCurrency(payment.amount)}
                      </div>
                      <div className="text-sm text-gray-400">
                        GST: {payment.gst_percentage}%
                      </div>
                      <div className="text-sm text-gray-400">
                        {new Date(payment.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => deletePayment(payment.id)}
                        className="text-red-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-300">Total Amount:</span>
                    <span className="text-lg font-medium text-orange-500">
                      {formatCurrency(payment.total_amount)}
                    </span>
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
