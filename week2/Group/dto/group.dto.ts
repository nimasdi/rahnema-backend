import { number, z } from "zod";
import { baseUserDto } from "../../User/dto/user.dto";
import { ExpensesDto } from "../../Expense/dto/expense.dto";

// export const GroupDto = z.object({
//     group_id: z.string().min(1),
//     name: z.string(),
//     people: z.array(number()) // userid
// });

export const baseGroupDto = z.object({
    group_id: z.string().min(1),
    name: z.string(),
    expenses: z.array(ExpensesDto)
});


export const groupDto = baseGroupDto.extend({
    people: z.array(baseUserDto),
});

export type Group = z.infer<typeof groupDto>;




