import { describe, expect, test } from '@jest/globals';
import { getUserExpenses, getGroupExpensesForUser } from './get-user-expenses';
import { users } from '../routes/user.route';
import { groups } from '../routes/group.route';


const mockUsers = [
    {
        full_name: "John Doe",
        user_id: "1",
        expenses: [
            { expense_id: "1", reason: "Shopping", amount: 50, group_id: "1" , user_id: "1" },
            { expense_id: "2", reason: "Dinner", amount: 30, group_id: "2" , user_id: "1" }
        ],
        groups: []
    },
    {
        full_name: "Jane Smith",
        user_id: "2",
        expenses: [
            { expense_id: "3", reason: "Movie Tickets", amount: 25, group_id: "1" , user_id: "2" },
            { expense_id: "4", reason: "Coffee", amount: 5, group_id: "2" , user_id: "2" }
        ],
        groups: []
    }
];

const mockGroups = [
    {
        group_id: "1",
        name: "Friends Group",
        expenses: [
            { expense_id: "1", reason: "Shopping", amount: 50, user_id: "1" , group_id : "1"},
            { expense_id: "3", reason: "Movie Tickets", amount: 25, user_id: "2" , group_id :" 1"}
        ],
        people: [
            {
                full_name: "John Doe",
                user_id: "1",
                expenses: [
                    { expense_id: "1", reason: "Shopping", amount: 50, user_id: "1" , group_id : "1"}
                ]
            },
            {
                full_name: "Jane Smith",
                user_id: "2",
                expenses: [
                    { expense_id: "3", reason: "Movie Tickets", amount: 25, user_id: "2" , group_id :" 1"}
                ]
            }
        ]
    },
    {
        group_id: "2",
        name: "Work Group",
        expenses: [
            { expense_id: "2", reason: "Dinner", amount: 30, user_id: "1" , group_id:"2" },
            { expense_id: "4", reason: "Coffee", amount: 5, user_id: "2" , group_id : "2" }
        ],
        people: [
            {
                full_name: "John Doe",
                user_id: "1",
                expenses: [
                    { expense_id: "2", reason: "Dinner", amount: 30, group_id: "2",user_id: "1" }
                ]
            },
            {
                full_name: "Jane Smith",
                user_id: "2",
                expenses: [
                    { expense_id: "4", reason: "Coffee", amount: 5, group_id: "2" , user_id: "2" }
                ]
            }
        ]
    }
];


users.push(...mockUsers)
groups.push(...mockGroups)

describe('getUserExpenses', () => {
    test('should return expenses for a valid user', () => {
        const userId = "1";
        const result = getUserExpenses(userId);
        const expectedExpenses = [
            { expense_id: "1", reason: "Shopping", amount: 50, group_id: "1" , user_id : "1" },
            { expense_id: "2", reason: "Dinner", amount: 30, group_id: "2" , user_id: "1"}
        ];
        expect(result.expenses).toEqual(expectedExpenses);
    });

    test('should return empty array for non-existing user', () => {
        const userId = "99";
        const result = getUserExpenses(userId);
        expect(result.expenses).toEqual([]);
    });
});

describe('getGroupExpensesForUser', () => {
    test('should return group expenses for a valid user', () => {
        const userId = "1";
        const result = getGroupExpensesForUser(userId);
        const expectedGroupExpenses = [
            { group_id: "1", expenses: [{ expense_id: "1", reason: "Shopping", amount: 50, user_id: "1" , group_id: "1" }] },
            { group_id: "2", expenses: [{ expense_id: "2", reason: "Dinner", amount: 30, user_id: "1"  , group_id: "2"}] }
        ];
        expect(result).toEqual(expectedGroupExpenses);
    });

    test('should return empty array for non-existing user', () => {
        const userId = "99";
        const result = getGroupExpensesForUser(userId);
        expect(result).toEqual([]);
    });
});
