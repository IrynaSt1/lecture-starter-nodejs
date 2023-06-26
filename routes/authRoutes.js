import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.post(
  "/login",
  (req, res, next) => {
   /* try {
      // TODO: Implement login action (get the user if it exist with entered credentials)
      authService.login(req.body);
        console.log('route LOGIN');
      res.data = data;
      console.log(res.data, 'data');
    } catch (err) {
      res.err = err;
      console.log(res.err, 'err');
    } finally {
      next();
    }
  },
  responseMiddleware
);*/
const checkEmail = authService.login({ email: req.headers.authorization });

    if(!checkEmail) {
        res.status(404).json({ error: true, message: "User is not found" });
    } else if(req.body.password !== checkEmail.password) {
        res.status(403).json({ error: true, message: "Wrong password" });
    } else {
        res.status(200).json({ message: "Access granted" });
    }
});

export { router };
