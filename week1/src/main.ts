import express = require('express');

type userType = "admin" | "normal" | "representive";
type User = {
    username:string,
    password:string,
    type :userType,
}
type Plan = {
    title :string,
    discription :string
}

const users :User[] = []
const plans :Plan[] = []

const app = express()

app.use(express.json());

app.post("/addplan", (req, res) => {
    const user:User = req.body.user
    if (user.type !== "admin") {
        return res.send({status : "you are not admin"})
    }   
    const title = req.body.title
    const discription = req.body.discription
    plans.push({
        title : title,
        discription : discription
    })
    res.send({status : "plan was added"})
});

app.get("/plans", (req, res) => {
    res.send(plans)
})

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});