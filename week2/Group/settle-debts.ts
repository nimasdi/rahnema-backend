import { Group } from "./dto/group.dto";

export interface Settlement {
    person: string;
    give_to: string;
    amount: number;
}

export const calculateSettlements = (group: Group): Settlement[] => {

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

