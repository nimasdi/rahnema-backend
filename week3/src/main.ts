import express, { Router } from 'express';
import { app as settleDebtsRouter } from './routes/settle-debts.route';
import { app as groupRouter } from './routes/group.route';
import { app as userRouter } from './routes/user.route';
import { app as expenseRouter } from './routes/get-user-expenses.route';
import { app as getUserExpenses } from "./routes/get-user-expenses.route";


const app = express();

app.use(express.json());

app.use("/" , settleDebtsRouter);
app.use("/" , groupRouter);
app.use("/" , userRouter);
app.use("/" , expenseRouter);
app.use("/" , getUserExpenses); 


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
