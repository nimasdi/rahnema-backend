import { describe, expect, test } from '@jest/globals';
import { groups } from '../routes/group.route';
import { createGroup } from './create-group';

describe('Create Group', () => {
    beforeEach(() => {
        groups.length = 0; 
    });

    test("should create a group", () => {
        const dto = {
            group_id: "1",
            name: "nima",
            people: [],
            expenses: []
        };

        createGroup(dto, groups);
        expect(groups).toContainEqual(dto);
    });

    test("should not create a group with duplicate group id", () => {
        const dto1 = {
            group_id: "1",
            name: "snapp",
            people: [],
            expenses: []
        };

        const dto2 = {
            group_id: "1",
            name: "tabsi",
            people: [],
            expenses: []
        };

        createGroup(dto1, groups);
        createGroup(dto2, groups);

        expect(groups).toContainEqual(dto1);
        expect(groups).not.toContainEqual(dto2);
    });
});
