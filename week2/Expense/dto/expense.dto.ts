import { z } from "zod";

export const ExpensesDto = z.object({
    title: z.string(),
    reason : z.string().min(1),
    expense : z.number(),
    user_id: z.string().min(1),
})

export type Expense = z.infer<typeof ExpensesDto>;