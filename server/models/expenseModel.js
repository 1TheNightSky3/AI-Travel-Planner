const db = require('../config/database');

// Create a new expense
exports.createExpense = async (expenseData) => {
  const {
    trip_id,
    expense_category,
    description,
    amount,
    expense_date,
  } = expenseData;

  const [result] = await db.execute(
    `INSERT INTO trip_expenses
     (trip_id, expense_category, description, amount, expense_date)
     VALUES (?, ?, ?, ?, ?)`,
    [trip_id, expense_category, description, amount, expense_date]
  );

  return result;
};

// Get all expenses
exports.getAllExpenses = async () => {
  const [rows] = await db.execute(
    `SELECT * FROM trip_expenses
     ORDER BY expense_date DESC, expense_id DESC`
  );

  return rows;
};

// Get expense by ID
exports.getExpenseById = async (expenseId) => {
  const [rows] = await db.execute(
    `SELECT * FROM trip_expenses
     WHERE expense_id = ?`,
    [expenseId]
  );

  return rows[0];
};

// Update expense
exports.updateExpense = async (expenseId, expenseData) => {
  const {
    expense_category,
    description,
    amount,
    expense_date,
  } = expenseData;

  const [result] = await db.execute(
    `UPDATE trip_expenses
     SET expense_category = ?,
         description = ?,
         amount = ?,
         expense_date = ?
     WHERE expense_id = ?`,
    [expense_category, description, amount, expense_date, expenseId]
  );

  return result;
};

// Delete expense
exports.deleteExpense = async (expenseId) => {
  const [result] = await db.execute(
    `DELETE FROM trip_expenses
     WHERE expense_id = ?`,
    [expenseId]
  );

  return result;
};

// Get category-wise expense summary
exports.getExpenseSummary = async (tripId) => {
  const [rows] = await db.execute(
    `SELECT expense_category,
            SUM(amount) AS total_amount
     FROM trip_expenses
     WHERE trip_id = ?
     GROUP BY expense_category`,
    [tripId]
  );

  return rows;
};

// Calculate total expenses
exports.getTotalExpenses = async (tripId) => {
  const [rows] = await db.execute(
    `SELECT COALESCE(SUM(amount), 0) AS total_expenses
     FROM trip_expenses
     WHERE trip_id = ?`,
    [tripId]
  );

  return rows[0];
};

// Check if trip exists
exports.checkTripExists = async (tripId) => {
  const [rows] = await db.execute(
    `SELECT id
     FROM trips
     WHERE id = ?`,
    [tripId]
  );

  return rows.length > 0;
};