import { Router } from "express";
import { groups } from "./group.route";
import { calculateSettlements } from "../Group/settle-debts";

export const app = Router();

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
        const settlements = calculateSettlements(group);

        res.status(200).send({ status: "success", settlements });
    } catch (error) {
        console.error("Error calculating settlements:", error);
        res.status(500).send({ status: "error", message: "Failed to calculate settlements" });
    }
});
