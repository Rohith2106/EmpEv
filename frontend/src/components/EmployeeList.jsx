import '../index.css'
import React, { useEffect, useState } from "react";


const BASE_URL = import.meta.env.VITE_BASE_URL;


const ViewEmployee = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(`${BASE_URL}/list`);
        if (!response.ok) throw new Error("Failed to fetch employees.");
        const data = await response.json();
        setEmployees(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching employees:", error.message);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Employee List</h1>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Employee ID</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Phone</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Department</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date of Joining</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Role</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <tr key={employee.id} className="border-t border-gray-200">
                                <td key={`employeeId-${employee.employeeId}`} className="border border-gray-300 px-4 py-2">{employee.employeeID}</td>
                                <td key={`name-${employee.employeename}`} className="border border-gray-300 px-4 py-2">{employee.name}</td>
                                <td key={`email-${employee.employeeemail}`} className="border border-gray-300 px-4 py-2">{employee.email}</td>
                                <td key={`phone-${employee.employeephone}`} className="border border-gray-300 px-4 py-2">{employee.phone}</td>
                                <td key={`department-${employee.employeedept}`} className="border border-gray-300 px-4 py-2">{employee.department}</td>
                                <td key={`dateOfJoining-${employee.employeedateOfJoining}`} className="border border-gray-300 px-4 py-2">{employee.dateOfJoining}</td>
                                <td key={`role-${employee.employeerole}`} className="border border-gray-300 px-4 py-2">{employee.role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-4 py-2 text-center text-gray-500">No employees found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;