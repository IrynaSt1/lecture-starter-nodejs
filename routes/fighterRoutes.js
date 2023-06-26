import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// TODO: Implement route controllers for fighter
router.get(
  "/",
  (req, res, next) => {
    const listOfFighters = fighterService.showList("fighters");
    if (!listOfFighters) {
      res.status(404).json({
        error: true,
        messsage: "List of fighters is empty",
      });
    } else {
      req.body = listOfFighters;
      next();
    }
  },
  responseMiddleware,
  (req, res) => {
    res.status(200).json({ "All fighters": req.body });
  }
);

router.get(
  "/:id",
  (req, res, next) => {
    const findOfFighter = fighterService.search({ id: req.params.id });
    if (!findOfFighter) {
      res.status(404).json({
        error: true,
        messsage: "Fighter is not found",
      });
    } else {
      req.body = findOfFighter;
      next();
    }
  },
  responseMiddleware,
  (req, res) => {
    res.status(200).json({ "Fighter found": req.body });
  }
);

router.post(
  "/",
  (req, res, next) => {
    if (fighterService.search({ email: req.body.email })) {
      res.status(400).json({
        error: true,
        messsage: "Email already exists",
      });
    } else {
      next();
    }
  },
  createFighterValid,
  (req, res, next) => {
    const createOfFighter = fighterService.createFighter(req.body);
    if (!createOfFighter) {
      res.status(400).json({
        error: true,
        messsage: "Failed to create fighter",
      });
    } else {
      req.body = createOfFighter;
      next();
    }
  },
  responseMiddleware,
  (req, res) => {
    res.status(200).json({ "Fighter created": req.body });
  }
);

router.put(
  "/:id",
  updateFighterValid,
  (req, res, next) => {
    const updateOfFighter = fighterService.updateFighter(
      req.params.id,
      req.body
    );
    if (!updateOfFighter) {
      res.status(400).json({
        error: true,
        messsage: "Fighter is not updated",
      });
    } else {
      req.body = updateOfFighter;
      next();
    }
  },
  responseMiddleware,
  (req, res) => {
    res.status(200).json({ "Fighter updated": req.body });
  }
);

router.delete(
  "/:id",
  (req, res, next) => {
    const deleteOfFighter = fighterService.deleteFighter(req.params.id);
    if (!deleteOfFighter) {
      res.status(404).json({
        error: true,
        messsage: "Fighter is not found",
      });
    } else {
      req.body = deleteOfFighter;
      next();
    }
  },
  responseMiddleware,
  (req, res) => {
    res.status(200).json({ "Fighter deleted": req.body });
  }
);

export { router };
