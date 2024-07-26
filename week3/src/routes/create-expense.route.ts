import { Router } from "express";
import { expenses } from "../database/Expense/expense-inmemory.database";
import { ExpensesDto } from "../models/Expense/dto/expense.dto";
import { ExpenseRepo } from "../models/Expense/expense.repo";
import { expenseRepo } from "../dependency";


export const app = Router()


app.post("/addexpense", (req, res) => {
    try {
        const expense = ExpensesDto.parse(req.body)
        expenseRepo.addExpense(expense)
        res.send({ message: "expense was added" })
    } catch (error) {
        res.send({ message: "invalid expense data" })
    }
})