"use client";

import React, { useEffect, useState } from "react";
import UsersTable from "./Usertable";
import api from "@/app/lib/axios";
import { API_URL } from "@/app/services/api_url";

// Example user data (replace with API call if needed)
const sampleUsers = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "1234567890",
    role: "Model",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    phone: "9876543210",
    role: "Photographer",
  },
];


export default function AdminUsersPage() {
  const [students, setStudents] = useState<any[]>([]);
  const getStudents = async ()=>{
    try{
      const response = await api.get(API_URL.STUDENT.BASIC)
      setStudents(response.data.results)
      console.log(response.data)
      return response.data
    }catch(error){
      console.log(error)
    }
  }
  
  useEffect(()=>{
    getStudents()
  },[])

  return (
    <div className="h-[100vh] ">
      {/* <h1 className="text-2xl font-bold mb-4 text-white">All Users</h1> */}
      <UsersTable getStudents={getStudents} users={students.length > 0 ? students : sampleUsers} />
    </div>
  );
}
