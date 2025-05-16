const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");

authRouter.get("/Login",authController.getLogin);
authRouter.post("/Login",authController.postLogin);
authRouter.get("/Logout",authController.postLogout);
authRouter.get("/SignUp",authController.getSignUp);
authRouter.post("/SignUp",authController.postSignUp);
authRouter.get("/Terms",authController.getTerms);

module.exports = authRouter;