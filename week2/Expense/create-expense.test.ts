import { describe, expect, test } from '@jest/globals';
import { createUser } from '../User/create-user';
import { createGroup } from '../Group/create-group';
import { users } from '../routes/user.route';
import { groups } from '../routes/group.route';
import { groupDto } from '../Group/dto/group.dto';
import { canCreateExpense, createExpense } from './create-expense';
import { Expense } from './dto/expense.dto';


const mockUserData = { full_name: "John Doe", user_id: "1", expenses: [], groups: [] };
const mockGroupData = { group_id: "1", name: "Test Group", expenses: [], people: [mockUserData] };


describe('Create expense', () => {

    createUser(mockUserData, users);
    createGroup(mockGroupData, groups);

    test('should create a expense', () => {
        const dto: Expense = {
            reason: "test",
            expense_id: "1",
            user_id: "1",
            group_id: "1",
            amount: 100
        };

        expect(canCreateExpense(dto)).toBe(true)

    });


    test('should not create a duplicate expense', () => {
        createExpense({
            reason: "test",
            expense_id: "1",
            user_id: "1",
            group_id: "1",
            amount: 100
        })

        const dto = {
            title: "test",
            reason: "test",
            expense_id: "1",
            user_id: "1",
            group_id: "1",
            amount: 100
        };
        expect(canCreateExpense(dto)).toBe(false)
    })
});

