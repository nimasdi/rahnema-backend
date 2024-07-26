import { GroupDataBase } from "../../database/data";
import { Group } from "./dto/group.dto";

export class GroupRepo {

    constructor(private group_database: GroupDataBase) {

    }


    getAllGroups() {
        return this.group_database.loadGroupsWithExpensesAndUsers()
    }

    addGroup(group: Group) {
        this.group_database.create(group)
    }


}