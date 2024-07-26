import { FileDatabase, GroupDataBase, UserDataBase } from "./database/data";
import { ExpenseRepo } from "./models/Expense/expense.repo";
import { GroupRepo } from "./models/Group/group.repo";
import { UserRepo } from "./models/User/user.repo";
import * as path from 'path';

const userFilePath = path.join(__dirname, './database/User/user.json');
const expenseFilePath = path.join(__dirname, './database/Expense/expense.json');
const groupFilePath = path.join(__dirname, './database/Group/group.json');

export const UserFileDB = new UserDataBase(userFilePath, expenseFilePath, groupFilePath);
export const GroupFileDB = new GroupDataBase(groupFilePath, expenseFilePath, userFilePath);
export const ExpenseFileDB = new FileDatabase(expenseFilePath);

export const userRepo = new UserRepo(UserFileDB);
export const groupRepo = new GroupRepo(GroupFileDB);
export const expenseRepo = new ExpenseRepo(ExpenseFileDB);

