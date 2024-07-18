import { Expense } from "../Expense/dto/expense.dto";
import { groups } from "../routes/group.route";
import { users } from "../routes/user.route";


export const getUserExpenses = (userId: string): { expenses: Expense[] } => {
    const user = users.find(u => u.user_id === userId);
    if (user) {
        return { expenses: user.expenses };
    }
    return { expenses: [] };
};

export const getGroupExpensesForUser = (userId: string): { group_id: string, expenses: Expense[] }[] => {
    const groupExpenses: { group_id: string, expenses: Expense[] }[] = [];

    groups.forEach(group => {
        const userInGroup = group.people.find(person => person.user_id === userId);
        if (userInGroup) {
            groupExpenses.push({
                group_id: group.group_id,
                expenses: userInGroup.expenses
            });
        }
    });

    return groupExpenses;
};