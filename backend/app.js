import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import employeeRoutes from './routes/employeeRoutes.js';
import nodemailer from 'nodemailer';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/employees', employeeRoutes);

app.get('/', (req, res) => {
    res.send('Employee Management API is running');
});


app.post('/api/employees/send-email', async (req, res) => {
    const { email, name } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'joshkumarsr@gmail.com',
                pass: 'hzgu hnyk lkdn wovb',
            },
        });

        const mailOptions = {
            from: 'joshkumarsr@gmail.com',
            to: email,
            subject: 'Welcome to the Company',
            text: `Hi ${name},\n\nWelcome to the company! We are glad to have you onboard.`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
