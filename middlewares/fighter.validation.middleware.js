import { FIGHTER } from "../models/fighter.js";

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation
  const temp = {};

  Object.keys(req.body).forEach((elem) => {
    if (!FIGHTER.hasOwnProperty(elem)) {
      temp[elem] = `${elem} is not defined for fighter`;
      return;
    }
  });

  if (!temp.health && req.body.health > 120 && req.body.health < 80) {
    temp.health = "Health value must be from 80 to 120";
  }

  if (!temp.power && req.body.power > 10 && req.body.power < 1) {
    temp.power = "Power value must be from 1 to 10";
  }

  if (!temp.defense && req.body.defense > 10 && req.body.defense < 1) {
    temp.defense = "Power value must be from 1 to 10";
  }

  if (!(Object.entries(temp).length === 0)) {
    res.status(400).json({ error: true, message: JSON.stringify(temp) });
  } else {
    next();
  }
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update
  const temp = {};

  Object.keys(req.body).forEach((elem) => {
    if (!fighter.hasOwnProperty(elem)) {
      temp[elem] = `${elem} is not defined for fighter`;
      return;
    }
  });

  if (
    req.body.health &&
    !temp.health &&
    req.body.health > 120 &&
    req.body.health < 80
  ) {
    temp.health = "Health value must be from 80 to 120";
  }

  if (
    req.body.power &&
    !temp.power &&
    req.body.power > 10 &&
    req.body.power < 1
  ) {
    temp.power = "Power value must be from 1 to 10";
  }

  if (
    req.body.defense &&
    !temp.defense &&
    req.body.defense > 10 &&
    req.body.defense < 1
  ) {
    temp.defense = "Power value must be from 1 to 10";
  }

  if (!(Object.entries(temp).length === 0)) {
    res.status(400).json({ error: true, message: JSON.stringify(temp) });
  } else {
    next();
  }
};

export { createFighterValid, updateFighterValid };
