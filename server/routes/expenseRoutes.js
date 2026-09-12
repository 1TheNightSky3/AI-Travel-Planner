const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expenseController');

// Create expense
router.post('/', expenseController.addExpense);

// Get all expenses
router.get('/', expenseController.getExpenses);

// Expense summary by trip (must come before /:id)
router.get('/summary/:tripId', expenseController.getExpenseSummary);

// Get expense by ID
router.get('/:id', expenseController.getExpense);

// Update expense
router.put('/:id', expenseController.editExpense);

// Delete expense
router.delete('/:id', expenseController.removeExpense);

module.exports = router;