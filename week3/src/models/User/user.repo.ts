import { UserDataBase } from "../../database/data";
import { Group } from "../Group/dto/group.dto";
import { GroupRepo } from "../Group/group.repo";
import { User } from "./dto/user.dto";

export class UserRepo {

    constructor(private user_database: UserDataBase , private groupRepo: GroupRepo) {

    }


    getAllUsers() {
        return this.user_database.loadUsersWithExpensesAndGroups()
    }

    addUser(user: User) {
        this.user_database.create(user)
    }

    addUserToGroup(group_id: string, user_id: string) {
        const users: User[] = this.user_database.loadUsersWithExpensesAndGroups();
        const groups: Group[] = this.groupRepo.getAllGroups();
        
        const user = users.find(user => user.user_id === user_id);
        const group = groups.find(group => group.group_id === group_id);

        if (group) {
            const { people, ...groupWithoutPeople } = group;
            
            if (user) {
                user.groups.push(groupWithoutPeople);
                this.user_database.updateUser(user_id, user);
            }
        }
    }
}
