import { Group } from "../Group/dto/group.dto";
import { groups } from "../routes/group.route";
import { users } from "../routes/user.route";
import { User } from "../User/dto/user.dto";
import { Expense  } from "./dto/expense.dto";
import { Response } from "express";

export const createExpense = (expense: Expense) => {

    const User = users.find(user => user.user_id === expense.user_id);
    const Group = groups.find(group => group.group_id === expense.group_id);
    
    if(Group?.expenses.includes(expense)) {
        return;
    }

    if(User && Group) {
        User.expenses.push(expense);
        Group.expenses.push(expense);
    }

}

export const canCreateExpense = (expense: Expense) => {

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