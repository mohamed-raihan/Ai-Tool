"use client";

import React from 'react';
import Link from 'next/link';

export default function ResultsPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Test Completed!</h1>
        <p className="text-gray-600 mb-8 text-center">
          Thank you for completing the psychometric assessment. Your results are being processed.
        </p>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h2 className="text-lg font-medium mb-3">What happens next?</h2>
          <p className="text-gray-600">
            Your responses will be analyzed, and a comprehensive report will be generated.
            You will receive your results via email within 24 hours.
          </p>
        </div>
        
        <div className="flex justify-center">
          <Link 
            href="/dashboard"
            className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 text-center"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}