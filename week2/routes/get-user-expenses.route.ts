import { Router } from "express";
import { Group, groupDto } from "../Group/dto/group.dto";
import { createGroup } from "../Group/create-group";
import { getGroupExpensesForUser, getUserExpenses } from "../User/get-user-expenses";



export const app = Router();

app.post("/get-user-expenses", (req, res) => {
    
    try {
        const user_id:string = req.body.user
        const expenses = getUserExpenses(user_id)
        res.status(200).send({expenses})
    } catch (error) {
        res.status(400).send({message:"invalid user data"})
    }
})

app.post("/get-group-expenses", (req, res) => {
    
    try {
        const user_id:string = req.body.user
        const expenses = getGroupExpensesForUser(user_id)
        res.status(200).send({expenses})
    } catch (error) {
        res.status(400).send({message:"invalid user data"})
    }
})