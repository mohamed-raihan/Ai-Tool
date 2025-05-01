"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { studentService, BasicDetails, EducationDetails, PersonalDetails } from '../../../services/student.service';
import { toast } from 'react-toastify';

type FormStep = 'basic' | 'education' | 'personal';

export default function ProfilePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<FormStep>('basic');
  const [loading, setLoading] = useState(false);

  const [basicDetails, setBasicDetails] = useState<BasicDetails>({
    name: '',
    phone: '',
    gender: 'Male',
    dob: '',
    email: '',
    address: ''
  });

  const [educationDetails, setEducationDetails] = useState<EducationDetails>({
    studying_in: '',
    specification: '',
    college: '',
    course: '',
    passing_year: '',
    university: '',
    planning_to_study: false,
    preparing_for_entrance_exam: false,
    student: 0 // This will be set from the user's ID
  });

  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    hobbies: '',
    curicular_activities: '',
    achievements: '',
    internship_projects: '',
    languages_known: '',
    student: 0 // This will be set from the user's ID
  });

  const handleBasicDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await studentService.updateBasicDetails(basicDetails);
      toast.success('Basic details updated successfully');
      setCurrentStep('education');
    } catch (error) {
      toast.error('Failed to update basic details');
    } finally {
      setLoading(false);
    }
  };

  const handleEducationDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await studentService.updateEducationDetails(educationDetails);
      toast.success('Education details updated successfully');
      setCurrentStep('personal');
    } catch (error) {
      toast.error('Failed to update education details');
    } finally {
      setLoading(false);
    }
  };

  const handlePersonalDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await studentService.updatePersonalDetails(personalDetails);
      toast.success('Profile completed successfully');
      router.push('/user/dashboard');
    } catch (error) {
      toast.error('Failed to update personal details');
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      <div className="flex space-x-4">
        {['basic', 'education', 'personal'].map((step, index) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === step
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {index + 1}
            </div>
            <div className="ml-2 text-sm font-medium text-gray-600">
              {step.charAt(0).toUpperCase() + step.slice(1)}
            </div>
            {index < 2 && (
              <div className="w-16 h-0.5 bg-gray-200 mx-2"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderBasicDetailsForm = () => (
    <form onSubmit={handleBasicDetailsSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={basicDetails.name}
          onChange={(e) => setBasicDetails({ ...basicDetails, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          required
          maxLength={200}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          value={basicDetails.phone}
          onChange={(e) => setBasicDetails({ ...basicDetails, phone: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Gender</label>
        <select
          value={basicDetails.gender}
          onChange={(e) => setBasicDetails({ ...basicDetails, gender: e.target.value as 'Male' | 'Female' | 'Other' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          required
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
        <input
          type="date"
          value={basicDetails.dob}
          onChange={(e) => setBasicDetails({ ...basicDetails, dob: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={basicDetails.email}
          onChange={(e) => setBasicDetails({ ...basicDetails, email: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          required
          maxLength={254}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <textarea
          value={basicDetails.address}
          onChange={(e) => setBasicDetails({ ...basicDetails, address: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Next'}
        </button>
      </div>
    </form>
  );

  const renderEducationDetailsForm = () => (
    <form onSubmit={handleEducationDetailsSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Studying In</label>
        <input
          type="text"
          value={educationDetails.studying_in}
          onChange={(e) => setEducationDetails({ ...educationDetails, studying_in: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Specification</label>
        <input
          type="text"
          value={educationDetails.specification}
          onChange={(e) => setEducationDetails({ ...educationDetails, specification: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">College</label>
        <input
          type="text"
          value={educationDetails.college}
          onChange={(e) => setEducationDetails({ ...educationDetails, college: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Course</label>
        <input
          type="text"
          value={educationDetails.course}
          onChange={(e) => setEducationDetails({ ...educationDetails, course: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Passing Year</label>
        <input
          type="text"
          value={educationDetails.passing_year}
          onChange={(e) => setEducationDetails({ ...educationDetails, passing_year: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">University</label>
        <input
          type="text"
          value={educationDetails.university}
          onChange={(e) => setEducationDetails({ ...educationDetails, university: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          required
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={educationDetails.planning_to_study}
          onChange={(e) => setEducationDetails({ ...educationDetails, planning_to_study: e.target.checked })}
          className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700">Planning to Study</label>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={educationDetails.preparing_for_entrance_exam}
          onChange={(e) => setEducationDetails({ ...educationDetails, preparing_for_entrance_exam: e.target.checked })}
          className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700">Preparing for Entrance Exam</label>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setCurrentStep('basic')}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Next'}
        </button>
      </div>
    </form>
  );

  const renderPersonalDetailsForm = () => (
    <form onSubmit={handlePersonalDetailsSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Hobbies</label>
        <textarea
          value={personalDetails.hobbies}
          onChange={(e) => setPersonalDetails({ ...personalDetails, hobbies: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Curricular Activities</label>
        <textarea
          value={personalDetails.curicular_activities}
          onChange={(e) => setPersonalDetails({ ...personalDetails, curicular_activities: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Achievements</label>
        <textarea
          value={personalDetails.achievements}
          onChange={(e) => setPersonalDetails({ ...personalDetails, achievements: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Internship Projects</label>
        <textarea
          value={personalDetails.internship_projects}
          onChange={(e) => setPersonalDetails({ ...personalDetails, internship_projects: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Languages Known</label>
        <textarea
          value={personalDetails.languages_known}
          onChange={(e) => setPersonalDetails({ ...personalDetails, languages_known: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          required
        />
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setCurrentStep('education')}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Complete Profile'}
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete Your Profile</h1>
        
        {renderStepIndicator()}

        <div className="bg-white p-6 rounded-lg shadow-md">
          {currentStep === 'basic' && renderBasicDetailsForm()}
          {currentStep === 'education' && renderEducationDetailsForm()}
          {currentStep === 'personal' && renderPersonalDetailsForm()}
        </div>
      </div>
    </div>
  );
}