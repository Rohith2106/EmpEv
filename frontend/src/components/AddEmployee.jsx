import React, { useState } from 'react';
import '../index.css';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const addEmployee = async (employeeData) => {
    try {
        const response = await fetch(`${BASE_URL}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(employeeData),
        });
        if (!response.ok) throw new Error('Failed to add employee.');
        return await response.json();
    } catch (error) {
        console.error("Error adding employee:", error.message);
        throw error;
    }
};

const AddEmployee = () => {
    const initialState = {
        name: '',
        employeeId: '',
        email: '',
        phoneNumber: '',
        department: '',
        dateOfJoining: '',
        role: '',
    };

    const [formValues, setFormValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [warnings, setWarnings] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const departments = ['HR', 'Engineering', 'Marketing'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const errors = {};
        const warnings = {};
        
        if (!formValues.name) errors.name = 'Name is required.';
        if (!formValues.employeeId) errors.employeeId = 'Employee ID is required.';
        if (!/^\S+@\S+\.\S+$/.test(formValues.email)) errors.email = 'Invalid email format.';
        if (!/^\d{10}$/.test(formValues.phoneNumber)) errors.phoneNumber = 'Phone number must be 10 digits.';
        if (!formValues.department) errors.department = 'Department is required.';
        if (!formValues.dateOfJoining) {
            errors.dateOfJoining = 'Date of joining is required.';
        } else if (new Date(formValues.dateOfJoining) > new Date()) {
            warnings.dateOfJoining = 'Date is in the future.';
        }
        if (!formValues.role) errors.role = 'Role is required.';

        setErrors(errors);
        setWarnings(warnings);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');
        if (!validate()) return;

        try {
            const response = await addEmployee(formValues);
            console.log('Employee added:', response);

            const emailResponse = await fetch(`${BASE_URL}/send-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formValues.email,
                    name: formValues.name,
                }),
            });

            if (!emailResponse.ok) throw new Error('Failed to send email');
            setSuccessMessage(
                'Employee added successfully, and confirmation email sent!'
            );
            setFormValues(initialState);
            setWarnings({});
        } catch (error) {
            console.error(error.message);
            setErrorMessage(error.message || 'An error occurred.');
        }
    };

    const handleReset = () => {
        setFormValues(initialState);
        setErrors({});
        setWarnings({});
        setSuccessMessage('');
        setErrorMessage('');
    };

    return (
        <div className="bg-gray-900 text-white p-6 shadow-md rounded-lg w-full max-w-3xl mx-auto mt-10">
            <h2 className="text-xl font-bold mb-4 text-center">Add Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formValues.name}
                        onChange={handleInputChange}
                        className="w-full border p-2 rounded bg-gray-800 text-white"
                    />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Employee ID:</label>
                    <input
                        type="text"
                        name="employeeId"
                        value={formValues.employeeId}
                        onChange={handleInputChange}
                        className="w-full border p-2 rounded bg-gray-800 text-white"
                    />
                    {errors.employeeId && <p className="text-red-500">{errors.employeeId}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleInputChange}
                        className="w-full border p-2 rounded bg-gray-800 text-white"
                    />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Phone Number:</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formValues.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full border p-2 rounded bg-gray-800 text-white"
                    />
                    {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Department:</label>
                    <select
                        name="department"
                        value={formValues.department}
                        onChange={handleInputChange}
                        className="w-full border p-2 rounded bg-gray-800 text-white"
                    >
                        <option value="">Select</option>
                        {departments.map((dept) => (
                            <option key={dept} value={dept}>
                                {dept}
                            </option>
                        ))}
                    </select>
                    {errors.department && <p className="text-red-500">{errors.department}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Date of Joining:</label>
                    <input
                        type="date"
                        name="dateOfJoining"
                        value={formValues.dateOfJoining}
                        onChange={handleInputChange}
                        className="w-full border p-2 rounded bg-gray-800 text-white"
                    />
                    {errors.dateOfJoining && <p className="text-red-500">{errors.dateOfJoining}</p>}
                    {warnings.dateOfJoining && <p className="text-yellow-500">{warnings.dateOfJoining}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Role:</label>
                    <input
                        type="text"
                        name="role"
                        value={formValues.role}
                        onChange={handleInputChange}
                        className="w-full border p-2 rounded bg-gray-800 text-white"
                    />
                    {errors.role && <p className="text-red-500">{errors.role}</p>}
                </div>
                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                <div className="flex justify-center gap-4 mt-6">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEmployee;
