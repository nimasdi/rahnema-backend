import { describe, expect, test } from '@jest/globals';
import { groupDto } from '../Group/dto/group.dto';
import { canCreateExpense, createExpense } from './create-expense';
import { Expense } from './dto/expense.dto';
import { testExpenseRepo, testGroupRepo, testUserRepo } from '../../dependency-test';
import { UserService } from '../User/user.service';



const mockUserData = { full_name: "John Doe", user_id: "1", expenses: [], groups: [] };
const mockGroupData = { group_id: "1", name: "Test Group", expenses: [], people: [mockUserData] };

const testUser = testUserRepo.getAllUsers().find(user => user.user_id === "1");


describe('Create expense', () => {

    test('should create a expense', () => {
        const dto: Expense = {
            reason: "test",
            expense_id: "3",
            user_id: "1",
            group_id: "1",
            amount: 100
        };

        expect(canCreateExpense(dto,testUserRepo,testGroupRepo)).toBe(false)

    });


    test('should not create a duplicate expense', () => {
        
        createExpense({
            reason: "test",
            expense_id: "10",
            user_id: "1",
            group_id: "1",
            amount: 100
        },testUserRepo,testGroupRepo,testExpenseRepo)

        const dto = {
            title: "test",
            reason: "test",
            expense_id: "10",
            user_id: "1",
            group_id: "1",
            amount: 100
        };
        expect(canCreateExpense(dto,testUserRepo,testGroupRepo)).toBe(false)
    })
});

