import { Expense } from "../Expense/dto/expense.dto";
import { User } from "./dto/user.dto";
import { UserRepo } from "./user.repo";

export class UserService {

    constructor(private userRepo: UserRepo) {}

    createUser(dto: User){
        const allusers = this.userRepo.getAllUsers();
        const userExists = allusers.some(user => user.user_id === dto.user_id);
        if (!userExists) {
            this.userRepo.addUser(dto);
        }
    }

    getUserExpenses(userId: string): { expenses: Expense[] } {
    
        const users =  this.userRepo.getAllUsers();
        const user = users.find(u => u.user_id === userId);
        if (user) {
            return { expenses: user.expenses };
        }
        return { expenses: [] };
    };

    addUserToGroup(group_id: string, user_id: string) {
        this.userRepo.addUserToGroup(group_id, user_id);
    }
}