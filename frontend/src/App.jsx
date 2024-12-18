import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddEmployee from './components/AddEmployee';
import EmployeeList from './components/EmployeeList';
import './index.css';

const App = () => {
    return (
        <Router>
            <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-start">
                <nav className="mt-10 flex space-x-4">
                    <Link
                        to="/add-employee"
                        className="px-6 py-3 font-semibold bg-blue-600 hover:bg-blue-700 rounded-md shadow-md transition-transform transform hover:scale-105"
                    >
                        Add Employees
                    </Link>
                    <Link
                        to="/view-employees"
                        className="px-6 py-3 font-semibold bg-blue-600 hover:bg-blue-700 rounded-md shadow-md transition-transform transform hover:scale-105"
                    >
                        View Employees
                    </Link>
                </nav>
                <div className="container mx-auto p-4 mt-10">
                    <Routes>
                        <Route path="/add-employee" element={<AddEmployee />} />
                        <Route path="/view-employees" element={<EmployeeList />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
