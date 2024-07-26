import {describe, expect, test} from '@jest/globals';
import { users } from "../routes/user.route";
import { createUser } from "./create-user";
import { User } from "./dto/user.dto";


describe('Create User', () => {
    test('should create user', () => {
        const dto = {
            full_name: "nima",
            user_id: "1",
            groups: [] ,
            expenses : []
        };
        createUser(dto, users)
        expect(users).toContainEqual(dto);
    });
});

