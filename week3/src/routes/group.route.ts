import { Router } from "express";
import { groupDto } from "../models/Group/dto/group.dto";
import { groups } from "../database/Group/group-inmemory.database";
import { GroupService } from "../models/Group/group.service";
import { groupRepo } from "../dependency";

export const app = Router();

const groupsService = new GroupService(groupRepo)

app.post("/addgroup", (req, res) => {
    try {
        const dto = groupDto.parse(req.body)
        groupsService.createGroup(dto)
        res.status(200).send({ message: "group was added" })
    }

    catch (error) {
        res.status(400).send({ message: "invalid group data" })
    }
})