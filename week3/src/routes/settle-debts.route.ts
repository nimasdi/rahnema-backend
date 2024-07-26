import { Router } from "express";
import { groups } from "../database/Group/group-inmemory.database";
import { GroupService } from "../models/Group/group.service"
import { groupRepo } from "../dependency";


export const app = Router();

const groupService = new GroupService(groupRepo);

app.post("/settle-debts", (req, res) => {

    const { group_id } = req.body;

    if (!group_id) {
        return res.status(400).send({ status: "error", message: "group_id is required" });
    }

    const group = groups.find(g => g.group_id === group_id);

    if (!group) {
        return res.status(404).send({ status: "error", message: "Group not found" });
    }

    try {
        const settlements = groupService.calculateSettlements(group);

        res.status(200).send({ status: "success", settlements });
    } catch (error) {
        console.error("Error calculating settlements:", error);
        res.status(500).send({ status: "error", message: "Failed to calculate settlements" });
    }
});
