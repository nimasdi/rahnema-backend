import express = require('express');

type userType = "admin" | "normal" | "representive";
type User = {
    username: string,
    password: string,
    type: userType,
}
type Plan = {
    title: string,
    discription: string,
}

const users: User[] = []
const plans: Plan[] = []

users.push({
    username: "nima",
    password: "mapq12",
    type: "admin"
});

const app = express()

app.use(express.json());

app.post("/addplan", (req, res) => {
    const user: User = req.body.user
    if (user.type !== "admin") {
        return res.send({ status: "you are not admin" })
    }
    const title = req.body.title
    const discription = req.body.discription
    plans.push({
        title: title,
        discription: discription
    })
    res.send({ status: "plan was added" })
});

app.get("/plans", (req, res) => {
    res.send(plans)
})

app.post("/login", (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const user = users.find(user => user.username === username && user.password === password)
    if (user) {
        return res.send({ status: "success" })
    }
    else {
        return res.send({ status: "fail, this user does not exist" })
    }
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});