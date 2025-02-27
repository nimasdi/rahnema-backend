import { Router } from "express";
import { userDto } from "../models/User/dto/user.dto";
import { userRepo } from "../dependency";
import { UserService } from "../models/User/user.service";


export const app = Router();

const userService = new UserService(userRepo);

app.post("/adduser", (req, res) => {
    try {
        const dto = userDto.parse(req.body)
        userService.createUser(dto)
        res.status(200).send({ message: "user was added" })

    } catch (error) {
        res.status(400).send({ message: "invalid user data" })
    }
})

app.post("/:group_id/add", (req, res) => {

    try {
        const { group_id } = req.params
        const {user_id} = req.body
        userService.addUserToGroup(group_id, user_id)
        res.status(200).send({ message: "user was added" })
    }

    catch (error) {
        res.status(400).send({ message: "invalid user data" })
        console.log(error)
    }
})