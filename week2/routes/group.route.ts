import { Router } from "express";
import { Group, groupDto } from "../Group/dto/group.dto";
import { createGroup } from "../Group/create-group";


export const groups:Group[] = []

export const app = Router();

app.post("/addgroup", (req, res) => {
    try {
        const dto = groupDto.parse(req.body)
        createGroup(dto,groups)
        res.send({ message: "group was added" })
    }

    catch (error) {
        res.send({ message: "invalid group data" })
    }   
})