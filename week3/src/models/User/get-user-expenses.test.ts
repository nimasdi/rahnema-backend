import { describe, expect, test } from '@jest/globals';
import { userRepo } from '../../dependency';
import { testGroupRepo, testUserRepo } from '../../dependency-test';
import { UserService } from './user.service';
import { GroupService } from '../Group/group.service';



const users = testUserRepo.getAllUsers();
const groups = testGroupRepo.getAllGroups();

const userService = new UserService(testUserRepo)
const groupService = new GroupService(testGroupRepo)

describe('getUserExpenses', () => {
    test('should return expenses for a valid user', () => {
        const userId = "1";
        const result = userService.getUserExpenses(userId);
        const expectedExpenses = [
            { expense_id: "1", reason: "Shopping", amount: 50, group_id: "1" , user_id : "1" },
            { expense_id: "2", reason: "Dinner", amount: 30, group_id: "2" , user_id: "1"}
        ];
        expect(result.expenses).toEqual(expectedExpenses);
    });

    test('should return empty array for non-existing user', () => {
        const userId = "99";
        const result = userService.getUserExpenses(userId);
        expect(result.expenses).toEqual([]);
    });
});

describe('getGroupExpensesForUser', () => {
    test('should return group expenses for a valid user', () => {
        const userId = "1";
        const result = groupService.getGroupExpensesForUser(userId);
        const expectedGroupExpenses = [
            { group_id: "1", expenses: [{ expense_id: "1", reason: "Shopping", amount: 50, user_id: "1" , group_id: "1" }] },
            { group_id: "2", expenses: [{ expense_id: "2", reason: "Dinner", amount: 30, user_id: "1"  , group_id: "2"}] }
        ];
        expect(result).toEqual(expectedGroupExpenses);
    });

    test('should return empty array for non-existing user', () => {
        const userId = "99";
        const result = groupService.getGroupExpensesForUser(userId);
        expect(result).toEqual([]);
    });
});
