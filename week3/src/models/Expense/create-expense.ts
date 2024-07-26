import { Group } from "../Group/dto/group.dto";
import { GroupRepo } from "../Group/group.repo";
import { User } from "../User/dto/user.dto";
import { UserRepo } from "../User/user.repo";
import { Expense  } from "./dto/expense.dto";
import { Response } from "express";
import { ExpenseRepo } from "./expense.repo";

export const createExpense = (expense: Expense , user_database:UserRepo , group_database:GroupRepo , expense_database:ExpenseRepo) => {

    const users = user_database.getAllUsers();
    const groups = group_database.getAllGroups();

    const User = users.find(user => user.user_id === expense.user_id);
    const Group = groups.find(group => group.group_id === expense.group_id);
    
    console.log(User , Group)
    if(Group?.expenses.includes(expense)) {
        return;
    }

    if(User && Group) {
        User.expenses.push(expense);
        Group.expenses.push(expense);
        expense_database.addExpense(expense);
    }

}

export const canCreateExpense = (expense: Expense , user_database:UserRepo , group_database:GroupRepo) => {

    const users = user_database.getAllUsers();
    const groups = group_database.getAllGroups();

    const User = users.find(user => user.user_id === expense.user_id);
    const Group = groups.find(group => group.group_id === expense.group_id);
    
    if(!User && !Group) {
        return false;
    }

    if(Group?.expenses.some(expense => expense.expense_id === expense.expense_id )) {
        return false;
    }

    return true;
}