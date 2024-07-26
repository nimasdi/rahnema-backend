import { UserDataBase } from "../../database/data";
import { User } from "./dto/user.dto";

export class UserRepo {

    constructor(private user_database:UserDataBase) {
        
    }


    getAllUsers(){
        return this.user_database.loadUsersWithExpensesAndGroups()   
    }

    addUser(user:User){
        this.user_database.create(user)
    }


}