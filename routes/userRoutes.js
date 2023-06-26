import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user
router.get('/', (req, res, next) => {
  const listOfUsers = userService.showList('names');
  if(!listOfUsers) {
      res.status(200).json({ messsage: "List of users is empty for now" });
  } else {
      let obj = [];
      listOfUsers.forEach(elem => {
          let { id, password, ...temp } = elem;
          obj.push(temp);
      });

      req.body = obj;
      next();
  }
}, (req, res) => {
  res.status(200).json({ "All users": req.body });
});

router.get('/:id', (req, res, next) => {
  const findOfUser = userService.search({ id: req.params.id });
  if(!findOfUser) {
      res.status(404).json({
          error: true,
          messsage: "User is not found"
      });
  } else {
      const { id, password, ...obj } = findOfUser;
      req.body = obj;
      next();
  }
}, (req, res) => {
  res.status(200).json({ "User is found": req.body });
});

router.post('/', createUserValid, (req, res, next) => {
  const createOfUser = userService.createUser(req.body);
  if(!createOfUser) {
      res.status(400).json({
          error: true,
          messsage: "Failed to create user"
      });
  } else {
      const { id, password, ...temp } = createOfUser;
      req.body = temp;
      next();
  }
}, (req, res) => {
  res.status(200).json({ "User created": req.body });
});

router.put('/:id', (req, res, next) => {
  if(!userService.search({ id: req.params.id })) {
      res.status(404).json({
          error: true,
          messsage: "User is not found"
      });
  } else {
      next();
  }
}, updateUserValid, (req, res, next) => {
  const updateOfUser = userService.updateUser(req.params.id, req.body);
  if(!updateOfUser) {
      res.status(400).json({
          error: true,
          messsage: "User is not updated"
      });
  } else {
      const { id, password, ...temp } = updateOfUser;
      req.body = temp;
      next();
  }
}, (req, res) => {
  res.status(200).json({ "User is updated": req.body });
});

router.delete('/:id', (req, res, next) => {
  const deleteOfUser = userService.deleteUser(req.params.id);
  if(!deleteOfUser) {
      res.status(404).json({
          error: true,
          messsage: "User is not found"
      });
  } else {
      const { id, password, ...temp } = deleteOfUser;
      req.body = temp;
      next();
  }
}, (req, res) => {
  res.status(200).json({ "User is deleted": req.body });
});

export { router };
