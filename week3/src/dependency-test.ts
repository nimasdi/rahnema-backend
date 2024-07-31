import { ExpenseRepo } from "./models/Expense/expense.repo";
import { FileDatabase, GroupDataBase, UserDataBase } from "./database/data";
import { GroupRepo } from "./models/Group/group.repo";
import { UserRepo } from "./models/User/user.repo";
import * as path from 'path';


const userFilePath = path.join(__dirname, './database/User/user.test.json');
const expenseFilePath = path.join(__dirname, './database/Expense/expense.test.json');
const groupFilePath = path.join(__dirname, './database/Group/group.test.json');

export const TestUserFileDB = new UserDataBase(userFilePath, expenseFilePath, groupFilePath);
export const TestGroupFileDB = new GroupDataBase(groupFilePath, expenseFilePath, userFilePath);
export const TestExpenseFileDB = new FileDatabase(expenseFilePath);

export const testGroupRepo = new GroupRepo(TestGroupFileDB);
export const testUserRepo = new UserRepo(TestUserFileDB,testGroupRepo);
export const testExpenseRepo = new ExpenseRepo(TestExpenseFileDB);

