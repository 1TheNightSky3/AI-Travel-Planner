const expenseModel = require('../models/expenseModel');

// Create expense
exports.addExpense = async (req, res) => {
  try {
    const result = await expenseModel.createExpense(req.body);

    res.status(201).json({
      success: true,
      message: 'Expense added successfully',
      expenseId: result.insertId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to add expense'
    });
  }
};

// Get all expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await expenseModel.getAllExpenses();

    res.status(200).json({
      success: true,
      data: expenses
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch expenses'
    });
  }
};

// Get expense by ID
exports.getExpense = async (req, res) => {
  try {
    const expense = await expenseModel.getExpenseById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    res.status(200).json({
      success: true,
      data: expense
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch expense'
    });
  }
};

// Update expense
exports.editExpense = async (req, res) => {
  try {
    const result = await expenseModel.updateExpense(req.params.id, req.body);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Expense updated successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to update expense'
    });
  }
};

// Delete expense
exports.removeExpense = async (req, res) => {
  try {
    const result = await expenseModel.deleteExpense(req.params.id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Expense deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete expense'
    });
  }
};

// Expense summary
exports.getExpenseSummary = async (req, res) => {
  try {
    const tripId = req.params.tripId;

    // Check if trip exists
    const tripExists = await expenseModel.checkTripExists(tripId);

    if (!tripExists) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    const summary = await expenseModel.getExpenseSummary(tripId);
    const total = await expenseModel.getTotalExpenses(tripId);

    res.status(200).json({
      success: true,
      tripId,
      totalExpenses: total.total_expenses,
      categorySummary: summary
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch expense summary'
    });
  }
};