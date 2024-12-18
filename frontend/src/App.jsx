import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddEmployee from './components/AddEmployee';
import EmployeeList from './components/EmployeeList';
import './index.css';

const App = () => {
    return (
        <Router>
            <div className="bg-white min-h-screen flex flex-col items-center justify-start">
                <nav className="mt-10 flex space-x-4">
                    <Link
                        to="/add-employee"
                        className="px-6 py-3 text-white font-semibold bg-primary hover:bg-primary-dark rounded-md shadow-md transition-transform transform hover:scale-105"
                    >
                        Add Employees
                    </Link>
                    <Link
                        to="/view-employees"
                        className="px-6 py-3 text-white font-semibold bg-primary hover:bg-primary-dark rounded-md shadow-md transition-transform transform hover:scale-105"
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
