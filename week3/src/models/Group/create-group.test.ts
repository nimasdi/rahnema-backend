import { describe, expect, test } from '@jest/globals';
import { testGroupRepo, testUserRepo } from '../../dependency-test';
import { GroupService } from './group.service';
import { UserService } from '../User/user.service';
import { groupRepo } from '../../dependency';


const users = testUserRepo.getAllUsers();
const groups = testGroupRepo.getAllGroups();

const userService = new UserService(testUserRepo)
const groupService = new GroupService(testGroupRepo)

describe('Create Group', () => {

    test("should create a group", () => {
        const dto = {
            group_id: "1",
            name: "nima",
            people: [],
            expenses: []
        };

       groupService.createGroup(dto);
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

        groupService.createGroup(dto1);
        groupService.createGroup(dto2);

        expect(groupRepo.getAllGroups()).toContainEqual(dto1);
        expect(groupRepo.getAllGroups()).not.toContainEqual(dto2);
    });
});
