import { Router } from "express";
import { createUser } from "../User/create-user";
import { User, userDto } from "../User/dto/user.dto";


export const users:User[] = []

export const app = Router();

app.post("/adduser", (req, res) => {
    try {
        const dto = userDto.parse(req.body)
        createUser(dto,users)
        res.status(200).send({ message: "user was added" })

    } catch (error) {
        res.status(400).send({ message: "invalid user data" })
    }
})