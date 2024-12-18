import { addEmployeeToDB, getAllEmployeesFromDB } from '../models/employeeModel.js';

export const addEmployee = async (req, res) => {
    try {
        const employeeData = req.body;
        const result = await addEmployeeToDB(employeeData);
        res.status(201).json({ message: 'Employee added successfully', employeeId: result.insertId });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getEmployees = async (req, res) => {
    try {
        const employees = await getAllEmployeesFromDB();
        res.status(200).json(employees);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const sendEmail = async (employeeData) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: "joshkumarsr@gmail.com",
            pass: "hzgu hnyk lkdn wovb"
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: employeeData.email,
        subject: 'Welcome to the Company!',
        text: `Dear ${employeeData.name},\n\nWelcome to the ${employeeData.department} department. Your employee ID is ${employeeData.employeeId}.\n\nBest regards,\nCompany HR`,
    };

    await transporter.sendMail(mailOptions);
};
