import db from '../config/db.js';

export const addEmployeeToDB = async (employee) => {
    const { name, employeeId, email, phoneNumber, department, dateOfJoining, role } = employee;
    const query = `
        INSERT INTO Employees (name, employeeId, email, phone, department, dateOfJoining, role)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [name, employeeId, email, phoneNumber, department, dateOfJoining, role]);
    return result;
};

export const getAllEmployeesFromDB = async () => {
    const query = 'select * from Employees';
    const [rows] = await db.query(query);
    return rows;
};
