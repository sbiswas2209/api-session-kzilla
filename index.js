const express = require('express');
const Joi = require('joi');
const cors = require('cors');

const app = express();
app.use(cors())

const people = [{
    name: "Pratham",
    age: 18
}, {
    name: "Harsh",
    age: 18
}];
app.use(express.json());

const port = process.env.PORT || 8080;

app.get("/fetch", (req, res) => {
    res.status(200).json({
        people: people,
        count: people.length
    })
})

app.post("/add", (req, res) => {
    console.info(req.body)
    const schema = Joi.object({
        name: Joi.string().required(),
        age: Joi.number().required()
    })
    const { data, error } = schema.validate(req.body)
    if (error) {
        res.status(422).json({
            message: "Validation Error"
        })
    } else {
        people.push(req.body);
        console.info(people)
        res.status(201).json({
            message: "Added"
        })
    }
})

app.listen(port, (err) => {
    if (err) {
        console.log("Error")
    } else {
        console.log("Server started on ", port)
    }
})