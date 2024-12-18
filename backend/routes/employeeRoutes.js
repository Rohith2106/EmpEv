import express from 'express';
import { addEmployee, getEmployees } from '../controllers/employeeController.js';

const router = express.Router();

router.post('/add', addEmployee);

router.get('/list', getEmployees);


export default router;
