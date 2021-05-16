const express = require("express");

const todoModel = require("./schema");
const db = require("./db");
const app = express();

const port = 3000;

app.use(express.json());

app.get("/todos", (req, res) => {
  todoModel
    .find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.json(err);
    });
});
app.get("/completed", (req, res) => {
  todoModel
    .find({ isCompleted: true })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.json(err);
    });
});
app.post("/create/todo", (req, res) => {
  const { task, description, deadline, isCompleted, priority } = req.body;
  const todo = new todoModel({
    task,
    description,
    deadline,
    isCompleted,
    priority,
  });
  todo
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});
app.put("/update/todo/:id", (req, res) => {
  const id = req.params.id;
  const { task, description, deadline, isCompleted, priority } = req.body;
  todoModel
    .findOneAndUpdate(
      { _id: id },
      { task, description, deadline, isCompleted, priority }
    )
    .then((result) => {
      res.send("todo has been updated");
    })
    .catch((err) => {
      res.send(err);
    });
});
app.delete("/delete/todo/:id", (req, res) => {
  const id = req.params.id;
  todoModel
    .findByIdAndRemove({ _id: id })
    .then((result) => {
      res.send("todo has been removed");
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(port, () => {
  console.log(`server is running on port : ${port}`);
});
