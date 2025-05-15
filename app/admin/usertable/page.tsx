"use client";

import React, { useEffect, useState } from "react";
import UsersTable from "./Usertable";
import api from "@/app/lib/axios";
import { API_URL } from "@/app/services/api_url";

// Example user data (replace with API call if needed)
const sampleUsers = [
  {
    id: "1",
    student_uuid: "sample-uuid-1",
    firebase_user_id: "firebase-1",
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "1234567890",
    class_name: { name: "Class A" },
    stream_name: { name: "Science" },
    role: "Model",
  },
  {
    id: "2",
    student_uuid: "sample-uuid-2",
    firebase_user_id: "firebase-2",
    name: "Bob Smith",
    email: "bob@example.com",
    phone: "9876543210",
    class_name: { name: "Class B" },
    stream_name: { name: "Arts" },
    role: "Photographer",
  },
];

interface Student {
  id: string;
  student_uuid: string;
  firebase_user_id: string;
  name: string;
  email: string;
  phone: string;
  class_name: { name: string };
  stream_name: { name: string };
  role: string;
}

export default function AdminUsersPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [prevPageUrl, setPrevPageUrl] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getStudents = async (url?: string) => {
    try {
      const response = await api.get(url || API_URL.STUDENT.BASIC);
      setStudents(response.data.results);
      setNextPageUrl(response.data.next);
      setPrevPageUrl(response.data.previous);
      setTotalCount(response.data.count);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="h-[100vh]">
      {/* <h1 className="text-2xl font-bold mb-4 text-white">All Users</h1> */}
      <UsersTable
        getStudents={getStudents}
        users={students?.length > 0 ? students : sampleUsers}
        nextPageUrl={nextPageUrl}
        prevPageUrl={prevPageUrl}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
