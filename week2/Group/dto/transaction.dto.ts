import { z } from "zod";

export const transactionDto = z.object({
    from : z.string(),
    to : z.string(),
    amount : z.number()
})

export type Transaction = z.infer<typeof transactionDto>