import { describe, expect, test } from '@jest/globals';
import { UserService } from './user.service';
import * as path from 'path';
import { FileDatabase, GroupDataBase, UserDataBase } from '../../database/data';
import { UserRepo } from './user.repo';
import { GroupRepo } from '../Group/group.repo';
import { ExpenseRepo } from '../Expense/expense.repo';
import { testUserRepo } from '../../dependency-test';



describe('Create User', () => {
    test('should create user', () => {
        const userServie = new UserService(testUserRepo);
        const dto = {
            full_name: "nima",
            user_id: "1",
            groups: [],
            expenses: []
        };

        expect(userServie.canCreateUser(dto)).toBe(false);
    });
});
