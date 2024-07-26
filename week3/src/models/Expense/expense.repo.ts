import { FileDatabase } from "../../database/data";
import { Expense } from "./dto/expense.dto";

export class ExpenseRepo {

    constructor(private expense_database:FileDatabase) {
        
    }


    getAllExpenses(){
        return this.expense_database.read<Expense>()   
    }

    addExpense(expense:Expense){
        this.expense_database.create(expense)
    }


}