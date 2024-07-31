import { Expense } from "../Expense/dto/expense.dto";
import { Group } from "./dto/group.dto";
import { GroupRepo } from "./group.repo";


export interface Settlement {
    person: string;
    give_to: string;
    amount: number;
}

export class GroupService{

    constructor(private groupRepo: GroupRepo) {}


    calculateSettlements(group: Group): Settlement[]{

        const settlements: Settlement[] = [];
        const expenses = group.expenses;
        const peoples = group.people;
        const lengh = group.people.length;
    
        expenses.forEach(expense => {
            peoples.forEach(person => {
    
                if (person.user_id !== expense.user_id) {
                    const settlement = {
                        person: person.user_id,
                        give_to: expense.user_id,
                        amount: expense.amount / lengh
                    }
                    settlements.push(settlement);
                }
            })
    
        });
    
        const consolidatedSettlements: Settlement[] = [];
    
        settlements.forEach(settlement => {
    
            let oppositeIndex = consolidatedSettlements.findIndex(s =>
                s.person === settlement.give_to && s.give_to === settlement.person
            );
    
            if (oppositeIndex !== -1) {
    
                consolidatedSettlements[oppositeIndex].amount -= settlement.amount;
                if (consolidatedSettlements[oppositeIndex].amount <= 0) {
                    consolidatedSettlements.splice(oppositeIndex, 1); // Remove if amount is zero or negative
                }
            } else {
    
                let existingIndex = consolidatedSettlements.findIndex(s =>
                    s.person === settlement.person && s.give_to === settlement.give_to
                );
    
                if (existingIndex !== -1) {
    
                    consolidatedSettlements[existingIndex].amount += settlement.amount;
                } else {
    
                    consolidatedSettlements.push({ ...settlement });
                }
            }
        });
    
        // console.log(consolidatedSettlements);
    
        return consolidatedSettlements;
    }
    
    
    createGroup(dto: Group) {
        const groups = this.groupRepo.getAllGroups();
        const groupExists = groups.some(group => group.group_id === dto.group_id);
        if (!groupExists) {
            this.groupRepo.addGroup(dto);
        }
    }

    canCreateGroup(dto: Group) {
        const groups = this.groupRepo.getAllGroups();
        const groupExists = groups.some(group => group.group_id === dto.group_id);
        return !groupExists;
    }
    

    getGroupExpensesForUser(userId: string ): { group_id: string, expenses: Expense[] }[]{
        const groupExpenses: { group_id: string, expenses: Expense[] }[] = [];
        const groups = this.groupRepo.getAllGroups();

        console.log(groups);

        
        groups.forEach(group => {
            const userInGroup = group.people.find(person => person.user_id === userId);
            console.log(userInGroup);
            if (userInGroup) {
                groupExpenses.push({
                    group_id: group.group_id,
                    expenses: userInGroup.expenses
                });
            }
        });
        
        return groupExpenses;
    };
}