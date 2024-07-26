import { Router } from "express";
import { GroupService } from "../models/Group/group.service";
import { groupRepo, userRepo } from "../dependency";
import { UserService } from "../models/User/user.service";

export const app = Router();

const groupsService  =new GroupService(groupRepo)
const userService = new UserService(userRepo);


app.post("/get-user-expenses", (req, res) => {
    
    try {
        const user_id:string = req.body.user
        const expenses = userService.getUserExpenses(user_id)
        res.status(200).send({expenses})
    } catch (error) {
        res.status(400).send({message:"invalid user data"})
    }
})

app.post("/get-group-expenses", (req, res) => {
    
    try {
        const user_id:string = req.body.user
        const expenses = groupsService.getGroupExpensesForUser(user_id)
        res.status(200).send({expenses})
    } catch (error) {
        res.status(400).send({message:"invalid user data"})
    }
})