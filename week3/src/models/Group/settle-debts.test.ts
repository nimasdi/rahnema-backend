import { describe, expect, test } from '@jest/globals';
import { Group } from './dto/group.dto';
import { testGroupRepo, testUserRepo } from '../../dependency-test';
import { UserService } from '../User/user.service';
import { GroupService, Settlement } from './group.service';


const users = testUserRepo.getAllUsers();
const groups = testGroupRepo.getAllGroups();

const userService = new UserService(testUserRepo)
const groupService = new GroupService(testGroupRepo)


describe('calculateSettlements', () => {
    
    test('should correctly calculate settlements for a group', () => {
        const exampleGroup: Group = {
            group_id: "group1",
            name: "Example Group",
            expenses: [
                { reason: "Dinner", amount: 120, user_id: "user1", group_id: "group1", expense_id: "expense1" },
                { reason: "Taxi", amount: 60, user_id: "user2", group_id: "group1", expense_id: "expense2" }
            ],
            people: [
                { full_name: "User One", user_id: "user1", expenses: [] },
                { full_name: "User Two", user_id: "user2", expenses: [] },
                { full_name: "User Three", user_id: "user3", expenses: [] }
            ]
        };

        const expectedTransactions: Settlement[] = [
            { person: 'user2', give_to: 'user1', amount: 20 },
            { person: 'user3', give_to: 'user1', amount: 40 },
            { person: 'user3', give_to: 'user2', amount: 20 }
        ];

        const transactions = groupService.calculateSettlements(exampleGroup);

        expect(transactions).toEqual(expectedTransactions);
    });



    test('should handle a group where everyone has zero balance', () => {
        const exampleGroup: Group = {
            group_id: "group2",
            name: "Zero Balance Group",
            expenses: [
                { reason: "Lunch", amount: 30, user_id: "user1", group_id: "group2", expense_id: "expense1" },
                { reason: "Snacks", amount: 30, user_id: "user2", group_id: "group2", expense_id: "expense2" },
                { reason: "Drinks", amount: 30, user_id: "user3", group_id: "group2", expense_id: "expense3" }
            ],
            people: [
                { full_name: "User One", user_id: "user1", expenses: [] },
                { full_name: "User Two", user_id: "user2", expenses: [] },
                { full_name: "User Three", user_id: "user3", expenses: [] }
            ]
        };
    
        const expectedSettlements: Settlement[] = [];
    
        const settlements = groupService.calculateSettlements(exampleGroup);
        expect(settlements).toEqual(expectedSettlements);
    });
    

    test('should handle a group with only one person', () => {
        const exampleGroup: Group = {
            group_id: "group3",
            name: "Single Person Group",
            expenses: [
                { reason: "Solo Expense", amount: 50, user_id: "user1", group_id: "group3", expense_id: "expense1" }
            ],
            people: [
                { full_name: "User One", user_id: "user1", expenses: [] }
            ]
        };
    
        const expectedSettlements: Settlement[] = [];
    
        const settlements = groupService.calculateSettlements(exampleGroup);
        expect(settlements).toEqual(expectedSettlements);
    });
    

    test('should handle a group where one person covers all expenses', () => {
        const exampleGroup: Group = {
            group_id: "group4",
            name: "One Person Pays All",
            expenses: [
                { reason: "Trip", amount: 300, user_id: "user1", group_id: "group4", expense_id: "expense1" }
            ],
            people: [
                { full_name: "User One", user_id: "user1", expenses: [] },
                { full_name: "User Two", user_id: "user2", expenses: [] },
                { full_name: "User Three", user_id: "user3", expenses: [] }
            ]
        };
    
        const expectedSettlements: Settlement[] = [
            { person: "user2", give_to: "user1", amount: 100 },
            { person: "user3", give_to: "user1", amount: 100 }
        ];
    
        const settlements = groupService.calculateSettlements(exampleGroup);
        expect(settlements).toEqual(expectedSettlements);
    });
    
});
