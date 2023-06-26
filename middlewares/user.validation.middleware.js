import { USER } from "../models/user.js";
import { userService } from "../services/userService.js";
const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation
  
  const temp = {};
  const emailValid = /^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@gmail.com$/;
  const phoneNumberValid = /^\+380\d{9}$/;

  Object.keys(USER)
    .filter((elem) => elem !== "id")
    .forEach((elem) => {
      if (!req.body.hasOwnProperty(elem)) {
        temp[elem] = `${elem} is required`;
      }
    });

  Object.keys(req.body).forEach((elem) => {
    if (!USER.hasOwnProperty(elem) || elem === "id") {
      temp[elem] = `${elem} is not defined for user`;
      return;
    }
  });

  if (!temp.email) {
    if (userService.search({ email: req.body.email })) {
      temp.email = "Email already exists";
    } else if (!req.body.email.match(emailValid)) {
      temp.email = "Invalid email";
    }
  }

  if (!temp.phoneNumber) {
    if (userService.search({ phoneNumber: req.body.phoneNumber })) {
      temp.phoneNumber = "Phone number already exists";
    } else if (!req.body.phoneNumber.match(phoneNumberValid)) {
      temp.phoneNumber = "Invalid phone number";
    }
  }

  if (!temp.password && req.body.password.length < 3) {
    temp.password = "Password is too short";
  }

  if (!(Object.entries(temp).length === 0)) {
    res.status(400).json({ error: true, message: temp });
  } else {
    next();
  }
  //next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  const temp = {};
  const emailValid = /^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@gmail.com$/;
  const phoneNumberValid = /^\+380\d{9}$/;

  Object.keys(req.body).forEach((elem) => {
    if (!USER.hasOwnProperty(elem)) {
      temp[elem] = `${elem} is not defined for user`;
      return;
    }
  });

  if (req.body.email && !temp.email) {
    if (!req.body.email.match(emailValid)) {
      temp.email = "Invalid email";
    } else if (userService.search({ email: req.body.email })) {
      temp.email = "Email already exists";
    }
  }

  if (req.body.phoneNumber && !temp.phoneNumber) {
    if (!req.body.phoneNumber.match(phoneNumberValid)) {
      temp.phoneNumber = "Invalid phone number";
    } else if (userService.search({ phoneNumber: req.body.phoneNumber })) {
      temp.phoneNumber = "Phone number already exists";
    }
  }

  if (req.body.password && !temp.password && req.body.password.length < 3) {
    temp.password = "Password is too short";
  }

  if (!(Object.entries(temp).length === 0)) {
    res.status(400).json({ error: true, message: temp });
  } else {
    next();
  }
  // next();
};

export { createUserValid, updateUserValid };
