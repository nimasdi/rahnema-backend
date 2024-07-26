import { describe, expect, test } from '@jest/globals';
import { UserService } from './user.service';
import * as path from 'path';
import { FileDatabase, GroupDataBase, UserDataBase } from '../../database/data';
import { UserRepo } from './user.repo';
import { GroupRepo } from '../Group/group.repo';
import { ExpenseRepo } from '../Expense/expense.repo';

const userFilePath = path.join(__dirname, './database/User/user.test.json');
const expenseFilePath = path.join(__dirname, './database/Expense/expense.test.json');
const groupFilePath = path.join(__dirname, './database/Group/group.test.json');

const TestUserFileDB = new UserDataBase(userFilePath, expenseFilePath, groupFilePath);
const testUserRepo = new UserRepo(TestUserFileDB);

describe('Create User', () => {
    test('should create user', () => {
        const userServie = new UserService(testUserRepo);
        const dto = {
            full_name: "nima",
            user_id: "1",
            groups: [],
            expenses: []
        };
        userServie.createUser(dto);
        const users = testUserRepo.getAllUsers();
        expect(users).toContainEqual(dto);
    });
});
