import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

let users = [];

router.get("/", (req, res) => {
  res.send(users);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  const foundUser = users.find((user) => user.id == id);

  res.send(foundUser);
});

router.post("/", (req, res) => {
  const user = req.body;

  const Id = uuidv4();
  const UserId = { ...user, id: Id };

  users.push(UserId);
  res.send(`User with the name ${user.firstName} added!`);
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  users = users.filter((user) => user.id != id);

  res.send(`User with the id ${id} deleted.`);
});

router.patch("/:id", (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, city } = req.body;

  const user = users.find((user) => user.id == id);

  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (city) user.city = city;

  res.send(`User with the id ${id} has been changed!`);
});
export default router;
