const express = require('express');
const hostRouter = express.Router();
const hostController = require('../controllers/hostController');

hostRouter.get("/adminHome",hostController.getIndex);
hostRouter.get("/adminHomeList",hostController.getHomeList);
hostRouter.get("/addHome",hostController.getAddHome);
hostRouter.post("/addHome",hostController.postAddHome);
hostRouter.get("/host/edit-home/:homeId",hostController.getEditHome);
hostRouter.post("/host/edit-home",hostController.postEditHome);
hostRouter.post("/host/delete-home/:homeId",hostController.postDeleteHome);

module.exports = {hostRouter};