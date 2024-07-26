import { z } from "zod";
import { baseGroupDto } from "../../Group/dto/group.dto";
import { ExpensesDto } from "../../Expense/dto/expense.dto";

// export const UserDto = z.object({
//   full_name: z.string(),
//   user_id: z.string().min(1),
//   groups: z.array(z.number()) // group IDs
// });

export const baseUserDto = z.object({
  full_name: z.string(),
  user_id: z.string().min(1),
  expenses: z.array(ExpensesDto)
});


export const userDto = baseUserDto.extend({
  groups: z.array(baseGroupDto),
});

export type User = z.infer<typeof userDto>;



